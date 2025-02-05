import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from './storage'; // Использует localStorage
import appReducer from './appSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import formReducer from './formSlice';

// Корневой редюсер с использованием combineReducers
export const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  product: productReducer,
  form: formReducer,
});

// Конфигурация redux-persist
const persistConfig = {
  key: 'root', // Ключ, под которым будет храниться состояние в localStorage
  storage, // Используем localStorage для хранения состояния
  whitelist: ['cart', 'app', 'form'], // Указываем, какие редьюсеры сохранять
};

// Оборачиваем корневой редюсер в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаём store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Создаём persistor
export const persistor = persistStore(store);

// Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
