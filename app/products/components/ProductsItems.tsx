import { IProduct } from '@/api/products/products.types';
import Grid from '@mui/material/Grid2';
import React from 'react';
import ItemProduct from './ItemProducts';

export default function ProductsItems({ products }: { products: IProduct[] }) {
  return (
    products.length > 0 &&
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
    })
  );
}
