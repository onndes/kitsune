import { tokens } from '@/styles/theme';
import { Theme, useMediaQuery, useTheme } from '@mui/material';

interface UseMyThemeReturn {
  mq: boolean;
  theme: Theme;
  colors: ReturnType<typeof tokens>;
}

const useMyTheme = (width: string = '900'): UseMyThemeReturn => {
  const mq = useMediaQuery(`(max-width:${width}px)`);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return { mq, theme, colors };
};

export default useMyTheme;
