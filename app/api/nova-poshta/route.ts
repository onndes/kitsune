import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

const API_KEY = process.env.NOVA_POSHTA_API_KEY;
const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

export async function POST(request: Request) {
  try {
    const { modelName, calledMethod, methodProperties } = await request.json();

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API_KEY is not defined' },
        { status: 500 }
      );
    }

    // Запрос к NovaPoshta API
    const response = await axios.post(BASE_URL, {
      apiKey: API_KEY,
      modelName,
      calledMethod,
      methodProperties,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Ошибка при выполнении запроса:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Ошибка при выполнении запроса:', error);
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
