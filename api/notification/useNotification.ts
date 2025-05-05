import axios from 'axios';
import { TelegramMessage, TelegramResponse } from './useNotification.types';
import { formatOrderMessage } from './formatOrderMessage';
import { IOrderSubmissionData } from '@/app/cart/formOrder.t';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

const sendMessage = async (formData: IOrderSubmissionData) => {
  const message = formatOrderMessage(formData);
  const response = await axios.post('/fn/telegram/send-message', { message });

  if (response.status !== 200) {
    throw new Error(`Ошибка отправки: ${response.statusText}`);
  }

  return response.data;
};

export const useSendMessage = (): UseMutationResult<
  TelegramResponse<TelegramMessage>, // Успешный результат
  Error, // Тип ошибки
  IOrderSubmissionData // Тип входящих данных
> =>
  useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      console.log('Сообщение успешно отправлено:', data);
    },
    onError: (error) => {
      console.error('Ошибка при отправке сообщения:', error.message);
    },
  });
