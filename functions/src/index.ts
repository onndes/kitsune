import { onRequest, Request } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Agent } from 'https';
import { Response } from 'express';

// Получаем переменные окружения напрямую из process.env
const API_KEY: string | undefined = process.env.TELEGRAM_ORDER_BOT_KEY;
const CHAT_ID: string | undefined = process.env.TELEGRAM_CHAT_ID;

const BASE_URL = 'https://api.telegram.org/bot';

// Определяем формат запроса и ответа
interface TelegramRequestBody {
  message: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: Record<string, unknown>;
  error_code?: number;
  description?: string;
}

// 🔹 Отправка сообщений в Telegram (в `europe-central2`)
export const sendTelegramMessage = onRequest(
  { region: 'europe-central2' }, // ✅ Добавили регион
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
      }

      if (!API_KEY || !CHAT_ID) {
        res.status(500).json({ error: 'API_KEY or CHAT_ID is not defined' });
        return;
      }

      const { message }: TelegramRequestBody = req.body;
      if (!message) {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const response: AxiosResponse<TelegramResponse> = await axios.post(
        `${BASE_URL}${API_KEY}/sendMessage`,
        { chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
          httpsAgent: new Agent({ keepAlive: true }),
        }
      );

      log('Сообщение отправлено:', response.data);
      res.json(response.data);
    } catch (error: unknown) {
      log('Ошибка при отправке в Telegram:', error);

      if (error instanceof AxiosError) {
        res.status(error.response?.status || 500).json({
          error: error.response?.data || error.message,
        });
        return;
      } else if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
        return;
      }
    }
  }
);
