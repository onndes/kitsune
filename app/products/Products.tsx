'use client';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IProduct, TLastProductId } from '@/api/products/products.types';
import { useProductsQuery } from '@/api/products/useProductsQuery';
import LoadingMoreButton from './components/LoadingMoreButton';
import MissProducts from './components/MissProducts';
import ProductsItems from './components/ProductsItems';

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

  const products = data.pages.flatMap((page) => page.products || []);
  return (
    <Container maxWidth={false} sx={{ pt: 0, pb: 4 }}>
      <Grid container spacing={2} pb={4}>
        <MissProducts show={products.length === 0} />
        <ProductsItems products={products} />
      </Grid>
      <LoadingMoreButton
        show={products.length > 0}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Container>
  );
}
