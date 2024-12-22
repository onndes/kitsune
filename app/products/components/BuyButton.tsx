'use client';

import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, styled, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'; // Adjust import path as per your project
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addProduct } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import { IOneProduct } from '@/types/products.types';
import { IProductWithPaths } from '@/common/utils/extractCategoryPath';

interface BuyButtonProps {
  product: IProductWithPaths;
  width?: string;
  sxButton?: Record<string, unknown>;
  content?: boolean;
}

// Styled Components
const StyledButton = styled(Button)<{ $width: string }>`
  font-weight: 600;
  font-size: 13px;
  color: ${(props) => props.theme.palette.primary.main};
  width: ${(props) => props.$width};
`;

const StyledTypography = styled(Typography)`
  font-size: 13px;
  font-weight: bold;
`;

const BuyButton: React.FC<BuyButtonProps> = ({
  product,
  width = '100%',
  sxButton = {},
  content = false,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  const check = cartProducts.some(
    (el: IProductWithPaths) => el?.code === product?.code
  );

  const handleAddProduct = () => {
    if (check) {
      router.push('/cart');
    } else {
      dispatch(addProduct(product));
    }
  };

  const iconContent = check ? (
    <ShoppingCartIcon
      sx={{
        color: 'white',
        fontSize: '23px',
        height: '100%',
      }}
    />
  ) : (
    <AddShoppingCartIcon
      sx={{
        color: 'primary',
        fontSize: '23px',
        height: '100%',
      }}
    />
  );

  const textContent = check ? (
    <StyledTypography sx={{ color: 'white' }}>Go to cart</StyledTypography>
  ) : (
    <StyledTypography sx={{ color: 'primary' }}>Add to cart +</StyledTypography>
  );

  return (
    <StyledButton
      size="small"
      variant={check ? 'contained' : 'outlined'}
      onClick={handleAddProduct}
      sx={sxButton}
      $width={width}
    >
      {content ? textContent : iconContent}
    </StyledButton>
  );
};

export default BuyButton;
