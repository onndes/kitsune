'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import HeaderBlock from './HeaderBlock';
import TabsBlock from './TabsBlock/TabsBlock';
import { IProduct } from '@/types/products.types';

interface Props {
  product: IProduct;
}

const Product = ({ product }: Props) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        '	&.MuiContainer-root': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      disableGutters
    >
      <Box sx={{ flex: 1, pb: 8 }}>
        <HeaderBlock product={product} />
        <TabsBlock product={product} />
      </Box>
      {/* <Footer /> */}
    </Container>
  );
};

export default Product;
