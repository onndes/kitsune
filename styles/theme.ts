import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/system';
import { darkTokens } from './tokensColor/dark';
import { lightTokens } from './tokensColor/light';

export const tokens = (mode: 'light' | 'dark') => ({
  ...(mode === 'dark' ? darkTokens : lightTokens),
});

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
    breakpoints: {
      values: {
        xs: 0,
        sm: 385,
        md: 900,
        lg: 1200,
        xl: 1536,

        base: 0, // Самый маленький экран (начальная точка)
        mobileSmall: 320, // Маленькие мобильные устройства
        mobileLarge: 480, // Большие смартфоны
        tabletPortrait: 768, // Планшеты в портретной ориентации
        tabletLandscape: 1024, // Планшеты в ландшафтной ориентации
        desktop: 1280, // Настольные мониторы
        widescreen: 1920, // Ультраширокие мониторы
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 8, // Добавляем параметр shape
    },
  });
};

// type CustomTheme = typeof themeSettings;

// declare module '@mui/material/styles' {
//   interface Theme extends CustomTheme {}
//   interface ThemeOptions extends Partial<CustomTheme> {}
// }
