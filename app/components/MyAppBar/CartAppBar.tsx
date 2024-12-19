import { MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { StyledIconButton, StyledBadge, StyledMenu } from './styles';

const CartAppBar = () => {
  const router = useRouter();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  return (
    auth && (
      <>
        <StyledIconButton
          aria-label="cart"
          onClick={() => router.push('/cart')}
        >
          <StyledBadge color="primary" max={999}>
            <ShoppingCartIcon fontSize="small" />
          </StyledBadge>
        </StyledIconButton>
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
