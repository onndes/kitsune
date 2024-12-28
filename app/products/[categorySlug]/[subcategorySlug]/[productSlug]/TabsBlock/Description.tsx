import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { IProduct } from '@/types/products.types';

interface Props {
  product: IProduct;
}

const Description = ({ product }: Props) => {
  return (
    <>
      <Typography variant="h5" component="span" color="initial">
        Характеристики:
      </Typography>
      <Box>
        {product.features.map((feature) => (
          <Box key={feature.title} sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body2" component="span" color="initial">
              {feature.title}:
            </Typography>

            <Typography variant="body2" component="span" color="text.secondary">
              {feature.feature}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Description;
