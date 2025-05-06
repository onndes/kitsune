/* eslint-disable no-console */
import axios, { isAxiosError } from 'axios';
import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { URLSearchParams } from 'url';
import { handleCors } from '../utils/cors.js';

interface Body {
  message?: string;
}
interface TelegramResp {
  ok: true;
  result: unknown;
}
interface TelegramErr {
  ok: false;
  error_code: number;
  description: string;
}

const TELEGRAM_TOKEN = defineSecret('TELEGRAM_ORDER_BOT_KEY');
const TELEGRAM_CHAT = defineSecret('TELEGRAM_CHAT_ID');

export const sendTelegramMessage = onRequest(
  {
    region: 'europe-west4',
    secrets: [TELEGRAM_TOKEN, TELEGRAM_CHAT],
    timeoutSeconds: 10,
  },
  async (req, res): Promise<void> => {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { message } = req.body as Body;
    if (!message?.trim()) {
      res.status(400).send('Message is required');
      return;
    }

    const url = `https://api.telegram.org/bot${encodeURIComponent(
      TELEGRAM_TOKEN.value()
    )}/sendMessage`;

    try {
      const tg = await axios.post<TelegramResp>(
        url,
        new URLSearchParams({
          chat_id: TELEGRAM_CHAT.value(),
          text: message,
          parse_mode: 'Markdown',
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      res.json(tg.data); // ok
    } catch (err: unknown) {
      let detail = 'Unknown error';

      if (isAxiosError<TelegramErr, unknown>(err)) {
        detail = err.response?.data?.description ?? err.message;
      } else if (err instanceof Error) {
        detail = err.message;
      }
      console.debug(
        'token',
        TELEGRAM_TOKEN.value().length,
        'chat',
        TELEGRAM_CHAT.value().length
      );
      console.log('Telegram error:', detail);
      res.status(500).json({ error: detail });
      console.error('Telegram error:', detail);
      res.status(500).json({ error: detail });
    }
  }
);
