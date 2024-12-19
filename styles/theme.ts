import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/system';
import { darkTokens } from './tokensColor/dark';
import { lightTokens } from './tokensColor/light';

export const tokens = (mode: 'light' | 'dark') => ({
  ...(mode === 'dark' ? darkTokens : lightTokens),
});

// Функция для создания темы в зависимости от режима
export const themeSettings = (mode: 'light' | 'dark'): ThemeOptions => {
  const colors = tokens(mode); // Получаем токены для текущего режима

  return createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: '#4E97FD',
            },
            secondary: {
              main: '#B8DEFE',
            },
            success: {
              main: '#47d147',
            },
            background: {
              default: '#F3F5F9',
              lightPrimary: '#F3F5F9',
            },
          }
        : {
            primary: {
              main: colors.primaryPink[500],
            },
            secondary: {
              main: colors.primaryPink[300],
            },
            success: {
              main: '#2eb82e',
            },
            background: {
              lightPrimary: colors.lightPinkPrimary[100],
              mediumPrimary: colors.lightPinkPrimary[200],
              heavyPrimary: colors.lightPinkPrimary[400],
              lightGrey: '#F6F9FC',
            },
            text: {
              //   main: '#4E97FD',
              //   primary: '#2B3445',
              //   secondary: '#7D879C',
            },
          }),
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {},
        },
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
    },
  });
};
