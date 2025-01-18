import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ImageBlockSlider from './ImageBlockSlider';
import { IProduct } from '@/api/products/products.types';
import Grid from '@mui/material/Grid2';
import BuyButton from '@/app/products/components/BuyButton';

interface Props {
  product: IProduct;
}

const HeaderBlock = ({ product }: Props) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          size={{ mobileLarge: 12, tabletPortrait: 7 }}
          sx={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            // width: '100%',
            // maxWidth: '425px',
          }}
        >
          <ImageBlockSlider image={product.image} />
        </Grid>
        <Grid
          pb={3}
          size={{ mobileLarge: 12, tabletPortrait: 5 }}
          // width={'100%'}
        >
          <Typography
            variant="h3"
            color="initial"
            fontWeight={500}
            fontSize="20px"
            letterSpacing="1px"
          >
            {product.name}
          </Typography>
          <Box pb={2}>
            <Typography
              //   variant="span"
              component="span"
              color="initial"
              fontWeight={300}
              fontSize="14px"
            >
              Код товару:{' '}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              fontWeight={300}
              fontSize="14px"
            >
              {product.code}
            </Typography>
          </Box>
          <Box pb={2}>
            <Typography
              component="span"
              color="initial"
              fontWeight={400}
              fontSize="14px"
            >
              Бренд:{' '}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              fontWeight={600}
              fontSize="14px"
            >
              {product.brand}
            </Typography>
          </Box>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            color="primary"
            sx={{
              fontSize: '35px',
              fontWeight: 600,
            }}
          >
            {product.price} ₴
          </Typography>
          <BuyButton
            width="150px"
            sxButton={{ padding: '13px 20px' }}
            product={product}
            content
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderBlock;
