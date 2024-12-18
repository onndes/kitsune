import { tokens } from '@/styles/tokens';
import { Theme, useMediaQuery, useTheme } from '@mui/material';

interface UseMyThemeReturn {
  mq: boolean; // Результат useMediaQuery
  theme: Theme; // Типизируем тему MUI
  colors: ReturnType<typeof tokens>; // Типизация для colors, возвращаемого функцией tokens
}

const useMyTheme = (width: string = '900'): UseMyThemeReturn => {
  const mq = useMediaQuery(`(max-width:${width}px)`);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return { mq, theme, colors };
};

export default useMyTheme;
