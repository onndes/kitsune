'use client'; // Указывает, что этот компонент должен рендериться на клиенте

import { Provider } from 'react-redux'; // Провайдер Redux
import { PersistGate } from 'redux-persist/integration/react'; // Компонент для работы с redux-persist
import { store, persistor } from '@/redux/store'; // Хранилище Redux и persistor
import type { ReactNode } from 'react'; // Тип дочерних элементов (например, страницы или компоненты)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  readonly children: ReactNode; // Указываем, что провайдер принимает дочерние элементы
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
});

export const StoreProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      {/* PersistGate гарантирует, что приложение не рендерится до восстановления состояния */}
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};
