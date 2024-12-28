import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Использует localStorage
import appReducer from './appSlice';
import cartReducer from './cartSlice';
// import categoryMenuReducer from './categoryMenuSlice';
// import productReducer from './productSlice';

// Корневой редюсер с использованием combineReducers
const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  // categoryMenu: categoryMenuReducer,
  // product: productReducer,
});

// Конфигурация redux-persist
const persistConfig = {
  key: 'root', // Ключ, под которым будет храниться состояние в localStorage
  storage, // Используем localStorage для хранения состояния
  whitelist: ['cart', 'app'], // Указываем, какие редьюсеры сохранять (например, корзина)
};

// Оборачиваем корневой редюсер в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Отключаем проверку сериализуемости для корректной работы redux-persist
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
