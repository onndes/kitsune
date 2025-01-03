import { MenuItem } from '@mui/material';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { StyledIconButton, StyledBadge, StyledMenu } from './styles';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const CartAppBar = () => {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cartProduct = useSelector((state: RootState) => state.cart.products);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const count = cartProduct.reduce((sum, el) => {
    return sum + el.count;
  }, 0);

  return (
    auth && (
      <>
        <Link href="/cart" passHref>
          <StyledIconButton aria-label="cart">
            <StyledBadge color="primary" max={999} badgeContent={count}>
              <ShoppingCartIcon fontSize="small" />
            </StyledBadge>
          </StyledIconButton>
        </Link>
        <StyledMenu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </StyledMenu>
      </>
    )
  );
};

export default CartAppBar;
