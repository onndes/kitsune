import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}

interface ColorModeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

declare module '@mui/material/styles' {
  interface TypeBackground {
    lightPrimary?: string;
    mediumPrimary?: string;
    heavyPrimary?: string;
    lightGrey?: string;
  }
  interface BreakpointOverrides {
    base: true;
    mobileSmall: true;
    mobileLarge: true;
    tabletPortrait: true;
    tabletLandscape: true;
    desktop: true;
    widescreen: true;
  }
}

declare module '@mui/material' {
  interface Palette {
    background: TypeBackground;
  }
  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }
}
