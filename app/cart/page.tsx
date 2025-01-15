'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Grid from '@mui/material//Grid2';
import ItemProductCart from './components/ItemProductCart/ItemProductCart';
import OrderPanel from './OrderPanel';
import useResponsive from '@/hooks/useResponsive';
import { RootState } from '@/redux/store';
import { Container } from '@mui/material';
import EmptyCart from './components/EmptyCart';

const style = {};

const Cart = () => {
  const { isTabletPortrait } = useResponsive();
  const products = useSelector((state: RootState) => state.cart.products);

  return (
    <Box pt={2} pb={5}>
      <Container
        maxWidth="lg"
        sx={{ '	&.MuiContainer-root': { height: '100%' } }}
      >
        <Box sx={style} minHeight="100%" maxWidth={1200}>
          {products.length > 0 ? (
            <Grid container spacing={2} sx={{ paddingBottom: 0 }}>
              <Grid
                size={{ xs: 12, md: 4 }}
                sx={{ paddingBottom: 0, maxWidth: '400px', margin: 'auto' }}
              >
                <OrderPanel products={products} />
              </Grid>
              <Grid
                size={{ xs: 12, md: 8 }}
                mt={isTabletPortrait ? 3 : 1}
                sx={{ paddingBottom: 0 }}
              >
                {products.map((el) => {
                  return <ItemProductCart key={el.code} product={el} />;
                })}
              </Grid>
            </Grid>
          ) : (
            <EmptyCart />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
