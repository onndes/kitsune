'use client';

import { useColorMode } from '@/hooks/theme';
import { Box, Typography } from '@mui/material';

const ThemeSensitiveComponent = () => {
  const { mode } = useColorMode(); // Получаем текущий режим (светлый или тёмный)

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: mode === 'light' ? '#f0f0f0' : '#333333', // Цвет фона зависит от темы
        color: mode === 'light' ? '#000000' : '#ffffff', // Цвет текста зависит от темы
        textAlign: 'center',
      }}
    >
      <Typography variant="h6">This element changes with the theme!</Typography>
    </Box>
  );
};

export default ThemeSensitiveComponent;
