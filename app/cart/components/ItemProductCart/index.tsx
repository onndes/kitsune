import { addProduct, removeProduct } from '@/redux/cartSlice';
import { IProduct } from '@/api/products/products.types';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import ImgBlock from '@/app/products/components/ImgBlock';

const ItemProductCart = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();

  const handleDelete = (remove: boolean) => {
    dispatch(removeProduct({ product, remove }));
  };
  const handleAdd = () => {
    dispatch(addProduct(product));
  };

  const hrefName = `/products/${encodeURIComponent(product.category)}/${encodeURIComponent(product.subcategory)}/${encodeURIComponent(product.code)}`;

  return (
    <Paper
      sx={{
        mb: 3,
      }}
      elevation={2}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Первый блок */}
        <Grid
          sx={{
            width: '125px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            href={hrefName}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textDecoration: 'none',
            }}
          >
            <ImgBlock
              src={product.image[0]}
              sxImageProps={{ width: 110, height: 110 }}
            />
          </Link>
        </Grid>

        {/* Второй блок */}
        <Grid
          sx={{
            flex: '1 1 auto', // Растягиваем блок на всё доступное пространство
            display: 'flex',
            maxWidth: 'calc(100% - 175px)',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            p: 1,
          }}
        >
          <Box>
            <Link href={hrefName} style={{ textDecoration: 'none' }}>
              <Typography
                component="div"
                variant="h6"
                fontWeight={400}
                fontSize={15}
                pl="2px"
                color="text.primary"
                sx={{ cursor: 'pointer' }}
                noWrap
              >
                {product.name}
              </Typography>
            </Link>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                component="div"
                fontSize="16px"
                fontWeight={400}
                pl="2px"
              >
                {product.price} ₴ x{product.count}
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                component="div"
                fontSize="16px"
                fontWeight={500}
                pl="2px"
              >
                {product.price * product.count} ₴
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <IconButton
                aria-label=""
                sx={{ padding: '4x' }}
                disabled={product.count <= 1}
                onClick={() => handleDelete(false)}
              >
                <IndeterminateCheckBoxOutlinedIcon
                  sx={(theme) => ({
                    fontSize: '25px',
                    color:
                      product.count > 1
                        ? theme.palette.primary.main
                        : 'inherit',
                  })}
                />
              </IconButton>
              <Typography id="count" variant="body1" textAlign="center">
                {product.count}
              </Typography>
              <IconButton
                aria-label=""
                sx={{ padding: '4px' }}
                onClick={() => handleAdd()}
              >
                <AddBoxOutlinedIcon
                  fontSize="small"
                  sx={(theme) => ({
                    fontSize: '25px',
                    color: theme.palette.primary.main,
                  })}
                />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* Третий блок */}
        <Grid
          sx={{
            width: '50px', // Фиксированная ширина
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={() => handleDelete(true)}
            aria-label="delete product"
            sx={{ m: 1, p: 0 }}
          >
            <CloseIcon sx={{ fontSize: '20px' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemProductCart;
