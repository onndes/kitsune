'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { themeSettings } from '../../styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContextType } from '@/types/styles';

// Создаём контекст
export const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  // Инициализация состояния темы: по умолчанию 'light'
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Проверка, доступен ли localStorage
    const savedMode = localStorage.getItem('colorMode') as
      | 'light'
      | 'dark'
      | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []); // Этот код выполнится только после первого рендера на клиенте

  // Используем useCallback для сохранения стабильности функции
  const toggleColorMode = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    // Сохраняем новый режим в localStorage
    localStorage.setItem('colorMode', newMode);
  }, [mode]); // Пересоздаём функцию, если меняется mode

  // Мемоизируем контекст, чтобы избежать лишних рендеров
  const colorMode = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode, toggleColorMode]
  );
  const theme = useMemo(() => themeSettings(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
