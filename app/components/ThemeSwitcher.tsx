'use client';

import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorMode } from '@/hooks/theme';

const ThemeSwitcher = () => {
  const { mode, toggleColorMode } = useColorMode(); // Получаем режим и функцию для переключения темы

  return (
    <IconButton onClick={toggleColorMode}>
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

export default ThemeSwitcher;
