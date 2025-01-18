'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useScrollPosition from '@/hooks/useScrollPosition';
import SearchInput from './SearchInput';
import LogoAppBar from './LogoAppBar';
import CartAppBar from './CartAppBar';
import { StyledAppBar, StyledToolbar } from '../styles';
import { ICategory, ISubCategoryWithPath } from '@/api/products/products.types';

interface Props {
  categories: ICategory[];
  subcategories: ISubCategoryWithPath[];
}

export default function MyAppBar({ categories, subcategories }: Props) {
  //   TODO
  //   const cartProduct = useSelector(({ cart }) => cart.products);

  const position = useScrollPosition();

  // TODO
  //   const count = cartProduct.reduce((sum, el) => {
  //     return sum + el.count;
  //   }, 0);

  return (
    <Box>
      <StyledAppBar elevation={position > 10 ? 5 : 0}>
        <Container maxWidth="lg">
          <StyledToolbar>
            <LogoAppBar categories={categories} subcategories={subcategories} />
            <SearchInput />
            <Box sx={{ display: 'flex', gap: 2 }}></Box>
            <CartAppBar />
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </Box>
  );
}
