import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.TELEGRAM_ORDER_BOT_KEY;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BASE_URL = 'https://api.telegram.org/bot';

export async function POST(request: Request) {
  console.log('---POST request---');
  try {
    const { message } = await request.json();

    if (!API_KEY || !CHAT_ID) {
      return NextResponse.json(
        { error: 'API_KEY or CHAT_ID is not defined' },
        { status: 500 }
      );
    }

    // Запрос к Telegram API
    console.log(`${BASE_URL}${API_KEY}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    });
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}${API_KEY}/sendMessage`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000, // Устанавливаем таймаут 5 секунд
      httpsAgent: new (require('https').Agent)({ keepAlive: true }), // Для поддержки долгосрочных соединений
      data: {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      },
    });
    console.log(response);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Ошибка при отправке сообщения:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
