import {
  createTheme,
  ThemeOptions,
} from '@mui/material/styles'
import { tokens } from './tokens' // Токены для цветов

// Функция для создания темы в зависимости от режима
export const themeSettings = (
  mode: 'light' | 'dark',
): ThemeOptions => {
  const currentTokens = tokens(mode) // Получаем токены для текущего режима

  return createTheme({
    palette: {
      mode, // Устанавливаем режим (light или dark)
      primary: {
        main: currentTokens.primary[500], // Используем основной цвет из токенов
      },
      secondary: {
        main: currentTokens.greenAccent[500], // Используем зелёный акцент
      },
      ...(mode === 'dark' && {
        background: {
          default: currentTokens.grey[900], // Тёмный фон для тёмного режима
          paper: currentTokens.grey[800],
        },
        text: {
          primary: '#fff', // Белый текст для тёмного режима
        },
      }),
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Пример шрифта
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
    },
    spacing: 8, // Пример кастомизации spacing
  })
}
