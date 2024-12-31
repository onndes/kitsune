'use client';

import { Container, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid2';
import ItemProduct from './components/ItemProducts';
import { IProduct, TLastProductId } from '@/types/products.types';
import { useProductsQuery } from '@/hooks/useProductsQuery';

interface Props {
  initialProducts: IProduct[];
  initialLastProductId: TLastProductId;
  category?: string;
  subcategory?: string;
  handleNextProduct?: () => void;
}

export default function Products({
  initialProducts,
  initialLastProductId,
  category,
  subcategory,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsQuery(
      category,
      subcategory,
      initialLastProductId,
      initialProducts
    );
  console.log(category, subcategory);
  const products = data.pages.flatMap((page) => page.products || []);

  return (
    <Container maxWidth={false} sx={{ pt: 0, pb: 4 }}>
      <Grid container spacing={2} pb={4}>
        {products.length === 0 && (
          <Grid size={{ xs: 12 }}>Товари відсутні</Grid>
        )}
        {products.length > 0 &&
          products.map((product, index) => {
            return (
              <Grid
                size={{ xs: 12, sm: 6, tabletLandscape: 4, md: 4, lg: 3 }}
                key={product.code}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 1 auto',
                }}
              >
                <ItemProduct product={product} index={index} />
              </Grid>
            );
          })}
      </Grid>
      {products.length > 0 && (
        <Box display="flex" justifyContent="center">
          <LoadingButton
            sx={{ height: '100%', fontWeight: 600 }}
            onClick={() => fetchNextPage()}
            type="submit"
            disabled={!hasNextPage}
            variant="outlined"
            size="large"
            loading={isFetchingNextPage}
          >
            Завантажити ще
          </LoadingButton>
        </Box>
      )}
    </Container>
  );
}
