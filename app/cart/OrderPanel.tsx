import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { IProduct } from '@/types/products.types';
import { Form } from './Form';

interface IOrderPanelProps {
  products: IProduct[];
}

const OrderPanel = ({ products }: IOrderPanelProps) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          component="p"
          fontSize="16px"
          fontWeight={400}
        >
          Всього
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          component="p"
          fontSize="20px"
          fontWeight={600}
        >
          {products.reduce((acc, prod) => {
            return acc + prod.count * prod.price;
          }, 0)}{' '}
          ₴
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
