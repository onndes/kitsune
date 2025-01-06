'use client';

import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fff5f7" // Мягкий розовый фон, чтобы соответствовать вашему дизайну
      className="loading-background"
    >
      <CircularProgress size={60} thickness={4.5} color="secondary" />
      <Typography variant="h6" color="secondary" mt={2}>
        Завантаження продукту...
      </Typography>
    </Box>
  );
}
