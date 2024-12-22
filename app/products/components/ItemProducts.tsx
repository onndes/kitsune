import React from 'react';
import { useRouter } from 'next/navigation';
import CardActions from '@mui/material/CardActions';
import { Box, Divider } from '@mui/material';
import { IOneProduct } from '@/types/products.types';
import BuyButton from './BuyButton';
import {
  StyledCard,
  ImgBlock,
  StyledCardContent,
  NameTypography,
  StyledBox,
  PriceTypography,
} from './styles';
import { IProductWithPaths } from '@/common/utils/extractCategoryPath';

export default function ItemProduct({
  product,
}: {
  product: IProductWithPaths;
}) {
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
      <Box sx={{ flex: 1 }}>
        <ImgBlock src={product.image[0]} onClick={handleClickProduct} />
      </Box>
      <Divider />
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
          <Box sx={{ display: 'flex', gap: 1 }}>
            <BuyButton product={product} />
          </Box>
        </StyledBox>
      </StyledCardContent>
      <CardActions sx={{ display: 'flex', gap: 1 }} disableSpacing />
    </StyledCard>
  );
}
