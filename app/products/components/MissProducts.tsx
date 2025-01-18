import Grid from '@mui/material/Grid2';
import React from 'react';

export default function MissProducts({ show }: { show: boolean }) {
  return show && <Grid size={{ xs: 12 }}>Товари відсутні</Grid>;
}
