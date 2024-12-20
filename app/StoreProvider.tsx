'use client'; // Указывает, что это компонент, который будет рендериться на клиенте, а не на сервере
import type { AppStore } from '@/redux/store'; // Тип для хранилища Redux (будет определяться в файле store.ts)
import { makeStore } from '@/redux/store'; // Функция для создания нового хранилища Redux
import { setupListeners } from '@reduxjs/toolkit/query'; // Функция для настройки слушателей запросов (необязательно, но рекомендуется для некоторых фич, таких как refetchOnFocus)
import type { ReactNode } from 'react'; // Тип для дочерних элементов компонента (ReactNode — это любой элемент React)
import { useEffect, useRef } from 'react'; // Хуки для работы с эффектами и ссылками
import { Provider } from 'react-redux'; // Компонент для подключения Redux хранилища в React-приложение

interface Props {
  readonly children: ReactNode; // Определяем, что компонент принимает дочерние элементы (например, страницы или другие компоненты)
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null); // Создаём ссылку, которая будет хранить ссылку на Redux store

  if (!storeRef.current) {
    // Если storeRef ещё не существует (то есть, это первый рендер), создаём экземпляр хранилища
    storeRef.current = makeStore(); // makeStore() создаёт новое хранилище Redux
  }

  useEffect(() => {
    // Этот хук выполняется после того, как компонент монтируется на клиенте
    if (storeRef.current != null) {
      // Если хранилище было создано (не null), то настраиваем слушателей
      // Это важно для фич, таких как refetchOnFocus и refetchOnReconnect, которые обеспечивают повторное получение данных при фокусировке или восстановлении соединения
      const unsubscribe = setupListeners(storeRef.current.dispatch);

      // Возвращаем функцию очистки, чтобы слушатели были правильно удалены, когда компонент будет размонтирован
      return unsubscribe;
    }
  }, []); // Хук с пустым массивом зависимостей, чтобы выполнить его только один раз после монтирования компонента

  // Возвращаем компонент Provider с хранилищем Redux, оборачивая дочерние элементы
  // Все дочерние компоненты получат доступ к Redux хранилищу
  return <Provider store={storeRef.current}>{children}</Provider>;
};
