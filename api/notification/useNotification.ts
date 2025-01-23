import axios from 'axios';
import { TelegramMessage, TelegramResponse } from './useNotification.types';
import { formatOrderMessage } from './formatOrderMessage';
import { IOrderSubmissionData } from '@/app/cart/formOrder.t';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

const API_KEY = process.env.NEXT_PUBLIC_TELEGRAM_ORDER_BOT_KEY as string;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID as string;
const BASE_URL = 'https://api.telegram.org/bot';

// api.telegram.org/bot<KEY>/getUpdates

// https://api.telegram.org/bot<KEY>/sendMessage?chat_id=<ID>&text=Привет+из+бота!

const telegramRequest = async <T>(
  modelName: string,
  message: string
): Promise<TelegramResponse<T>> => {
  const response = await axios.post(`${BASE_URL}${API_KEY}/${modelName}`, {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
  });
  return response.data;
};

export const useSendMessage = (): UseMutationResult<
  TelegramResponse<TelegramMessage>, // Успешный результат
  Error, // Тип ошибки
  IOrderSubmissionData // Тип входящих данных
> =>
  useMutation({
    mutationFn: async (formData: IOrderSubmissionData) => {
      const message = formatOrderMessage(formData);
      return await telegramRequest<TelegramMessage>('sendMessage', message);
    },
    onSuccess: (data) => {
      console.log('Сообщение успешно отправлено:', data);
    },
    onError: (error) => {
      console.error('Ошибка при отправке сообщения:', error.message);
    },
  });
