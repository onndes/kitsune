'use client';

import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid2';
import ItemProduct from './components/ItemProducts';
import { IProduct } from '@/types/products.types';

interface Props {
  handleNextProduct?: () => void;
  products: IProduct[];
}

export default function Products({ products, handleNextProduct }: Props) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Заглушка для предотвращения "прыжков"
    return null;
  }

  return (
    <Container maxWidth={false} sx={{ pt: 0, pb: 4 }}>
      <Grid container spacing={2} pb={4}>
        {products?.length === 0 && <Grid size={{ xs: 12 }}>Товарів немає</Grid>}
        {/* {isLoading && (
          <Grid size={{ xs: 12 }} minHeight="300px">
            <LinearLoader position="relative" />
          </Grid>a
        )} */}
        {products?.length > 0 &&
          products.map((product) => {
            return (
              <Grid
                size={{ xs: 12, sm: 6, tablet: 4, md: 4, lg: 3 }}
                // size={8}
                key={product.code}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 1 auto',
                }}
              >
                <ItemProduct product={product} />
              </Grid>
            );
          })}
      </Grid>
      {products?.length > 0 && (
        <Box display="flex" justifyContent="center">
          <LoadingButton
            sx={{ height: '100%', fontWeight: 600 }}
            onClick={handleNextProduct}
            type="submit"
            // disabled={!onButtonLoadProduct}
            variant="outlined"
            size="large"
          >
            Завантажити ще
          </LoadingButton>
        </Box>
      )}
    </Container>
  );
}
