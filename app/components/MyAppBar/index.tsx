'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useScrollPosition from '@/hooks/useScrollPosition';
import SearchInput from './SearchInput';
import LogoAppBar from './LogoAppBar';
import CartAppBar from './CartAppBar';
import { StyledAppBar, StyledToolbar } from './styles';
// import MyDrawer from '../MyDrawer';

export default function MyAppBar() {
  //   todo
  //   const cartProduct = useSelector(({ cart }) => cart.products);

  const position = useScrollPosition();

  // todo
  //   const count = cartProduct.reduce((sum, el) => {
  //     return sum + el.count;
  //   }, 0);

  return (
    <Box>
      <StyledAppBar elevation={position > 10 ? 5 : 0}>
        <Container maxWidth="lg">
          <StyledToolbar>
            <LogoAppBar />
            <SearchInput />
            <Box sx={{ display: 'flex', gap: 2 }}></Box>
            <CartAppBar />
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </Box>
  );
}
