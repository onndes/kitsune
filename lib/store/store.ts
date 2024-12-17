import type { Action, ThunkAction } from '@reduxjs/toolkit'; // Импортируем типы для Action и ThunkAction из Redux Toolkit
import { combineSlices, configureStore } from '@reduxjs/toolkit'; // Импортируем функции для комбинирования редьюсеров и настройки хранилища

// `combineSlices` автоматически комбинирует редьюсеры с использованием их `reducerPath`,
// поэтому больше не нужно вручную вызывать `combineReducers`.
const rootReducer = combineSlices();

// Определяем тип `RootState` на основе корневого редьюсера
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` инкапсулирует конфигурацию хранилища, чтобы можно было создавать уникальные экземпляры хранилища.
// Это особенно важно для серверного рендеринга (SSR), где необходимо создавать отдельные экземпляры хранилища для каждого запроса,
// чтобы избежать загрязнения состояния между запросами.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer, // Указываем комбинированный редьюсер, который включает все слайсы
    // Добавление middleware для API позволяет использовать кэширование, инвалидизацию, опросы
    // и другие полезные фичи `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat
        // quotesApiSlice.middleware,
        (); // Добавляем middleware для `quotesApiSlice`
    },
  });
};

// Определяем тип `AppStore`, используя возвращаемое значение из `makeStore`
// Это позволяет типизировать хранилище Redux, что полезно для TypeScript.
export type AppStore = ReturnType<typeof makeStore>;

// Определяем тип `AppDispatch`, который будет использоваться для диспетчеризации действий
// Этот тип основан на типе `dispatch` из хранилища.
export type AppDispatch = AppStore['dispatch'];

// Определяем тип для `AppThunk` — это тип для асинхронных действий с использованием `ThunkAction`.
// `ThunkAction` позволяет выполнять асинхронные операции, которые могут работать с состоянием и выполнять действия.
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType, // Тип возвращаемого значения из Thunk (по умолчанию `void`)
  RootState, // Тип состояния, которое используется в Thunk
  unknown, // Примечание для неизвестных типов, которые могут использоваться в Thunk (например, API-сервисы)
  Action // Тип действия, которое будет выполнено
>;
