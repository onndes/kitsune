'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material//Grid2';
import Item from './components/Item/Item';
import OrderPanel from './OrderPanel';
import cartEmpty from '../../assets/img/cartEmpty.png';
import useResponsive from '@/hooks/useResponsive';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@mui/material';

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
                  return (
                    <Item
                      key={el.code}
                      product={el}
                      // last={idx === arr.length - 1}
                    />
                  );
                })}
              </Grid>
            </Grid>
          ) : (
            <Box textAlign="center" mb={5}>
              <Box maxWidth="200px" display="inline-block" pt={5}>
                <Image src={cartEmpty} alt="Cart empty" width={200} />
              </Box>
              <Typography
                variant="h4"
                color="text.primary"
                fontWeight={600}
                pb={5}
              >
                Oops... the basket is empty
              </Typography>
              <Link href="/" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '200px',
                    height: '34px',
                    fontSize: '18px',
                    color: 'white',
                  }}
                >
                  Back
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
