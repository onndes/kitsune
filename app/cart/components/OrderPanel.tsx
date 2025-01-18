import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { IProduct } from '@/api/products/products.types';
import { Form } from './Form';

interface IOrderPanelProps {
  products: IProduct[];
}

const OrderPanel = ({ products }: IOrderPanelProps) => {
  const orderTotalPrice = products.reduce((acc, prod) => {
    return acc + prod.count * prod.price;
  }, 0);

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pb: 2,
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          component="p"
          fontSize="16px"
          fontWeight={500}
        >
          Всього
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          component="p"
          fontSize="18px"
          fontWeight={500}
        >
          {orderTotalPrice} ₴
        </Typography>
      </Box>
      <Divider />
      <Box pt={2} pb={2}>
        <Form />
      </Box>
    </Paper>
  );
};

export default OrderPanel;
