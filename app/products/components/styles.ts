import { Card, CardContent, Typography, Box, Shadows } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 200,
  border: '1px solid rgba(230, 230, 230, 1)',
  borderRadius: '10px',
  padding: 0,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  '&:hover': {
    boxShadow: (theme!.shadows as Shadows)[4],
  },
}));

export const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const StyledBox = styled(Box)({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const ImgBlock = styled('div')<{ src: string }>(({ src }) => ({
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '200px',
  cursor: 'pointer',
}));

export const PriceTypography = styled(Typography)(({ theme }) => ({
  fontSize: '19px',
  fontWeight: 600,
  margin: 0,
  color: theme.palette.primary.main,
}));

export const NameTypography = styled(Typography)({
  display: 'flex',
  marginBottom: 'auto',
  fontSize: '15px',
  fontWeight: 600,
  color: '#4d4d4d',
  cursor: 'pointer',
});
