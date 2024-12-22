import { styled, Card, CardContent, Typography, Box } from '@mui/material';

export const StyledCard = styled(Card)`
  max-width: 100%;
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  flex: 1;
  &:hover {
    box-shadow: ${(props) => props.theme.shadows[4]};
  }
`;

export const StyledCardContent = styled(CardContent)`
  padding-bottom: 0;
  flex: 1;
  display: 'flex';
  flex-direction: column;
`;

export const ImgBlock = styled('div')<{ src: string }>(({ src }) => ({
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '200px',
  cursor: 'pointer',
}));

export const PriceTypography = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  margin: 0;
  color: ${(props) => props.theme.palette.primary.main};
`;

export const NameTypography = styled(Typography)`
  font-size: 15px;
  font-weight: 600;
  color: #4d4d4d;
  cursor: pointer;
`;

export const StyledBox = styled(Box)`
  display: 'flex';
  gap: 1;
  justify-content: 'space-between';
  align-items: 'center';
`;
