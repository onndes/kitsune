'use client';

import React from 'react';
import { Box, Divider } from '@mui/material';
import BuyButton from './BuyButton';
import {
  StyledCard,
  StyledCardContent,
  NameTypography,
  StyledBox,
  PriceTypography,
} from './styles';
import { IProduct } from '@/types/products.t';
import ImgBlock from './ImgBlock';
import Link from 'next/link';

export default function ItemProduct({
  product,
  index,
}: {
  product: IProduct;
  index: number;
}) {
  const catString = (str: string, maxLength: number) => {
    if (str.length > maxLength) return `${str.slice(0, maxLength)}...`;
    return str;
  };

  const hrefName = `/products/${encodeURIComponent(product.category)}/${encodeURIComponent(product.subcategory)}/${encodeURIComponent(product.code)}`;

  return (
    <StyledCard elevation={0}>
      <Link href={hrefName}>
        <Box sx={{ flex: 0 }}>
          <ImgBlock src={product.image[0]} index={index} />
          <Divider />
        </Box>
      </Link>

      <StyledCardContent>
        <Link href={hrefName} style={{ textDecoration: 'none' }}>
          <NameTypography gutterBottom variant="body1">
            {catString(product.name, 40)}
          </NameTypography>
        </Link>
        <StyledBox>
          <PriceTypography gutterBottom>{product.price} ₴</PriceTypography>
          <Box
            sx={{
              display: 'flex',
              gap: 0,
            }}
          >
            <BuyButton product={product} />
          </Box>
        </StyledBox>
      </StyledCardContent>
    </StyledCard>
  );
}
