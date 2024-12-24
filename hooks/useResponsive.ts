'use client';

import { useMediaQuery, useTheme } from '@mui/material';

function useResponsive() {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    isXs,
    isSm,
    isMd,
    isLg,
  };
}

export default useResponsive;
