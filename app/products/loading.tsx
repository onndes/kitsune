'use client';

import { Box, Container, Divider, Skeleton } from '@mui/material';
import { StyledBox, StyledCard, StyledCardContent } from './components/styles';
import Grid from '@mui/material/Grid2';
import { defaultCountsLoading } from '@/api/categories/enums';

const ItemLoading = () => (
  <StyledCard elevation={0}>
    {/* /* Skeleton-загрузка для изображения */}
    <Box
      sx={{ flex: 0 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={1}
    >
      <Skeleton variant="rectangular" width={160} height={160} />
    </Box>
    <Divider />
    <StyledCardContent>
      {/* Skeleton-загрузка для имени */}
      <Skeleton variant="text" width="80%" />
      {/* Skeleton-загрузка для цены */}
      {/* <Skeleton variant="text" width="0%" /> */}
      {/* Skeleton-загрузка для кнопки */}
      <StyledBox>
        <Skeleton variant="rectangular" width="100px" height="30px" />
        <Skeleton variant="rectangular" width="64px" height="31px" />
      </StyledBox>
    </StyledCardContent>
  </StyledCard>
);

const LoadingProductCard = () => {
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // Имитация загрузки данных
  //     const timer = setTimeout(() => setLoading(false), 300000);
  //     return () => clearTimeout(timer);
  //   }, []);

  return (
    <Container maxWidth={false} sx={{ pt: 0, pb: 4 }}>
      <Grid container spacing={2} pb={4}>
        <>
          {Array.from({ length: defaultCountsLoading }).map((_, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, tabletLandscape: 4, md: 4, lg: 3 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 auto',
              }}
            >
              <ItemLoading />
            </Grid>
          ))}
        </>
      </Grid>
    </Container>
  );
};

export default LoadingProductCard;
