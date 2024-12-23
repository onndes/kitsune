import { Container, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid2';
import ItemProduct from './components/ItemProducts';
import { getProducts } from '@/lib/firebase/getProducts';

interface Props {
  handleNextProduct?: () => void;
  category?: string;
  subcategory?: string;
}

export default async function Products({
  handleNextProduct,
  category,
  subcategory,
}: Props) {
  const { productsImgSplash } = await getProducts({
    limitNumber: 10,
    category,
    subcategory,
  });

  return (
    <Container maxWidth={false} sx={{ pt: 0, pb: 4 }}>
      <Grid container spacing={2} pb={4}>
        {productsImgSplash?.length === 0 && (
          <Grid size={{ xs: 12 }}>Товарів немає</Grid>
        )}
        {/* {isLoading && (
          <Grid size={{ xs: 12 }} minHeight="300px">
            <LinearLoader position="relative" />
          </Grid>
        )} */}
        {productsImgSplash?.length > 0 &&
          productsImgSplash.map((product) => {
            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={product.code}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  // flex: 1,
                }}
              >
                <ItemProduct product={product} />
              </Grid>
            );
          })}
      </Grid>
      {productsImgSplash?.length > 0 && (
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
