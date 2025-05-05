import { NextResponse } from 'next/server';
import axios from 'axios';
import { Agent } from 'https'; // ⬅️ Импортируем https.Agent

const API_KEY = process.env.TELEGRAM_CONFIG_ORDER_BOT_KEY;
const CHAT_ID = process.env.TELEGRAM_CONFIG_CHAT_ID;
const BASE_URL = 'https://api.telegram.org/bot';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!API_KEY || !CHAT_ID) {
      return NextResponse.json(
        { error: 'API_KEY or CHAT_ID is not defined' },
        { status: 500 }
      );
    }

    const response = await axios({
      method: 'post',
      url: `${BASE_URL}${API_KEY}/sendMessage`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // Устанавливаем таймаут 10 секунд
      httpsAgent: new Agent({ keepAlive: true }), // ✅ Теперь без require()
      data: {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios ошибка:', error.message);
      return NextResponse.json(
        {
          error: error.response?.data || error.message,
          status: error.response?.status || 500,
        },
        { status: error.response?.status || 500 }
      );
    } else if (error instanceof Error) {
      console.error('Обычная ошибка:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Неизвестная ошибка:', error);
      return NextResponse.json(
        { error: 'Unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
