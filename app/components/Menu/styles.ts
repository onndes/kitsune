// Location: app/components/MyMenu/MyMenu.styles.ts
import useMyTheme from '@/hooks/useMyTheme';
import {
  styled,
  Paper,
  Container,
  Box,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material';

interface ItemButtonProps {
  сselected: string | null;
}

// Стиль для контейнера меню
export const StyledPaperMenu = styled(Paper)(() => ({
  pt: 0,
  height: '100%',
  borderColor: '2px solid red',
  width: '270px',
}));

// Стиль для контейнера
export const StyledContainerMenu = styled(Container)(() => ({
  height: '100%',
  pt: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
}));

// Стиль для обёртки заголовка
export const StyledWrapperTitle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 2),
  backgroundColor: theme.palette.background.heavyPrimary,
  borderRadius: '5px',
  fontSize: 10,
}));

// Стиль для заголовка
export const StyledTitleTypography = styled(Typography)(() => ({
  color: '#4b566b',
  fontSize: '17px',
  fontWeight: 600,
  letterSpacing: '1px',
}));

export const ItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'сselected',
})<ItemButtonProps>(({ theme, сselected }) => {
  const { colors } = useMyTheme();

  return {
    padding: theme.spacing(1, 1, 1, 1),
    cursor: 'pointer',
    backgroundColor: '#F3F5F9',
    div: {
      color: сselected,
    },
    fontSize: '25px',
    '&:hover': {
      backgroundColor: theme.palette.background.mediumPrimary,
      div: {
        color: colors.primaryPink[400],
        span: {
          color: colors.primaryPink[400],
        },
      },
    },
  };
});

export const ItemText = styled(ListItemText)(() => ({
  fontWeight: 600,
  color: '#5e6d87',
  '& .MuiListItemText-primary': {
    fontSize: '0.9rem', // Обеспечиваем размер для основного текста
  },
}));

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isСurrent',
})<{ isСurrent: boolean }>(({ theme, isСurrent }) => ({
  paddingLeft: theme.spacing(4),
  backgroundColor: isСurrent ? theme.palette.action.selected : 'inherit',
}));

export const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isСurrent',
})<{ isСurrent: boolean }>(({ theme, isСurrent }) => ({
  color: isСurrent ? theme.palette.primary.main : '#5e6d87',
}));
