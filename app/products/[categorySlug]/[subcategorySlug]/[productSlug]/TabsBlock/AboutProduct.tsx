import { IProduct } from '@/types/products.types';
import { Box, List, Typography } from '@mui/material';
import React from 'react';

interface Props {
  product: IProduct;
}

const AboutProduct = ({ product }: Props) => {
  return (
    <List>
      {product.descriptions.map((desc) => (
        <Box
          key={desc.title}
          sx={{
            display: 'block',
          }}
        >
          <Typography variant="h5" color="text.secondary" pb={1}>
            {desc.title}
          </Typography>
          {desc.paragraphs.map((p) => (
            <Typography
              key={p}
              variant="body2"
              component="span"
              color="initial"
            >
              {p}
            </Typography>
          ))}
        </Box>
      ))}
    </List>
  );
};

export default AboutProduct;
