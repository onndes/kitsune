'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Divider } from '@mui/material';
import BuyButton from './BuyButton';
import {
  StyledCard,
  StyledCardContent,
  NameTypography,
  StyledBox,
  PriceTypography,
} from './styles';
import { IProduct } from '@/types/products.types';
import ImgBlock from './ImgBlock';

export default function ItemProduct({ product }: { product: IProduct }) {
  const router = useRouter();

  const handleClickProduct = () => {
    router.push(`/product/${product.code}`);
  };

  const catString = (str: string, maxLength: number) => {
    if (str.length > maxLength) return `${str.slice(0, maxLength)}...`;
    return str;
  };

  return (
    <StyledCard elevation={0}>
      <Box sx={{ flex: 0 }}>
        <ImgBlock
          src={product.image[0]}
          handleClickProduct={handleClickProduct}
        />
        <Divider />
      </Box>

      <StyledCardContent>
        <NameTypography
          gutterBottom
          variant="body1"
          onClick={handleClickProduct}
        >
          {catString(product.name, 40)}
        </NameTypography>
        <StyledBox>
          <PriceTypography gutterBottom>{product.price} ₴</PriceTypography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <BuyButton product={product} />
          </Box>
        </StyledBox>
      </StyledCardContent>
    </StyledCard>
  );
}
