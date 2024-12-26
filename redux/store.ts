import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import cartReducer from './cartSlice';
// import categoryMenuReducer from './categoryMenuSlice';
// import productReducer from './productSlice';

const rootReducer = combineSlices({
  app: appReducer,
  cart: cartReducer,
  // categoryMenu: categoryMenuReducer,
  // product: productReducer,
});

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
