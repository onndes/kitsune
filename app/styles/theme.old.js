import { createTheme } from '@mui/material/styles';
import { createContext, useState, useMemo } from 'react';

export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        grey: {
          100: '#e6e6e6',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#666666',
          600: '#525252',
          700: '#3d3d3d',
          800: '#292929',
          900: '#141414',
        },

        primary: {
          100: '#dceaff',
          200: '#b8d5fe',
          300: '#95c1fe',
          400: '#71acfd',
          500: '#4e97fd',
          600: '#3e79ca',
          700: '#2f5b98',
          800: '#1f3c65',
          900: '#101e33',
        },
        greenAccent: {
          100: '#dbf5ee',
          200: '#b7ebde',
          300: '#94e2cd',
          400: '#70d8bd',
          500: '#4cceac',
          600: '#3da58a',
          700: '#2e7c67',
          800: '#1e5245',
          900: '#0f2922',
        },
        redAccent: {
          100: '#f8dcdb',
          200: '#f1b9b7',
          300: '#e99592',
          400: '#e2726e',
          500: '#db4f4a',
          600: '#af3f3b',
          700: '#832f2c',
          800: '#58201e',
          900: '#2c100f',
        },
        blueAccent: {
          100: '#e1e2fe',
          200: '#c3c6fd',
          300: '#a4a9fc',
          400: '#868dfb',
          500: '#6870fa',
          600: '#535ac8',
          700: '#3e4396',
          800: '#2a2d64',
          900: '#151632',
        },
      }
    : {
        grey: {
          900: '#141414',
          800: '#292929',
          700: '#3d3d3d',
          600: '#525252',
          500: '#666666',
          400: '#858585',
          300: '#a3a3a3',
          200: '#c2c2c2',
          100: '#e6e6e6',
        },
        primary: {
          100: '#dceaff',
          200: '#b8d5fe',
          300: '#95c1fe',
          400: '#71acfd',
          500: '#4e97fd',
          600: '#3e79ca',
          700: '#2f5b98',
          800: '#1f3c65',
          900: '#101e33',
        },
        primaryPink: {
          100: '#ffebeb',
          200: '#fed7d8',
          300: '#fec3c4',
          400: '#fdafb1',
          500: '#fd9b9d',
          600: '#ca7c7e',
          700: '#985d5e',
          800: '#653e3f',
          900: '#331f1f',
        },
        lightPrimary: {
          100: '#f4f8ff',
          200: '#e8f1ff',
          300: '#ddebfe',
          400: '#d1e4fe',
          500: '#c6ddfe',
          600: '#9eb1cb',
          700: '#778598',
          800: '#4f5866',
          900: '#282c33',
        },

        lightPinkPrimary: {
          100: '#fff3f3',
          200: '#ffe7e7',
          300: '#fedbdc',
          400: '#fecfd0',
          500: '#fec3c4',
          600: '#cb9c9d',
          700: '#987576',
          800: '#664e4e',
          900: '#332727',
        },
        greenAccent: {
          100: '#0f2922',
          200: '#1e5245',
          300: '#2e7c67',
          400: '#3da58a',
          500: '#4cceac',
          600: '#70d8bd',
          700: '#94e2cd',
          800: '#b7ebde',
          900: '#dbf5ee',
        },
        redAccent: {
          100: '#2c100f',
          200: '#58201e',
          300: '#832f2c',
          400: '#af3f3b',
          500: '#db4f4a',
          600: '#e2726e',
          700: '#e99592',
          800: '#f1b9b7',
          900: '#f8dcdb',
        },
        blueAccent: {
          100: '#151632',
          200: '#2a2d64',
          300: '#3e4396',
          400: '#535ac8',
          500: '#6870fa',
          600: '#868dfb',
          700: '#a4a9fc',
          800: '#c3c6fd',
          900: '#e1e2fe',
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
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
      Paper: {
        styleOverrides: {
          root: {},
        },
      },
    },
    typography: {
      fontFamily: ['Open Sans', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Open Sans', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Open Sans', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Open Sans', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Open Sans', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Open Sans', 'sans-serif'].join(','),
        fontSize: 18,
      },
      h6: {
        fontFamily: ['Open Sans', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem('colorMode') || 'light'
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const modeOn = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('colorMode', modeOn);
          return modeOn;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
