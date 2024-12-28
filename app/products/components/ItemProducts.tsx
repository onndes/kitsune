'use client';

import React from 'react';
// import { usePathname } from 'next/navigation';
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
import Link from 'next/link';

export default function ItemProduct({
  product,
  index,
}: {
  product: IProduct;
  index: number;
}) {
  // const pathName = usePathname();
  // const handleClickProduct = () => {
  //   router.push(`/product/${product.code}`);
  // };

  const catString = (str: string, maxLength: number) => {
    if (str.length > maxLength) return `${str.slice(0, maxLength)}...`;
    return str;
  };

  const hrefName = `/products/${encodeURIComponent(product.category)}/${encodeURIComponent(product.subcategory)}/${encodeURIComponent(product.code)}`;

  // const href

  return (
    <StyledCard elevation={0}>
      <Link href={hrefName}>
        <Box sx={{ flex: 0 }}>
          <ImgBlock
            src={product.image[0]}
            // handleClickProduct={handleClickProduct}
            index={index}
          />
          <Divider />
        </Box>
      </Link>

      <StyledCardContent>
        <Link href={hrefName}>
          <NameTypography
            gutterBottom
            variant="body1"
            // onClick={handleClickProduct}
          >
            {catString(product.name, 40)}
          </NameTypography>
        </Link>
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
