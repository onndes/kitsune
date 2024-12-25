'use client';

import { useMediaQuery, useTheme } from '@mui/material';

function useResponsive() {
  const theme = useTheme();

  const isBase = useMediaQuery(theme.breakpoints.down('base'));
  const isMobileSmall = useMediaQuery(theme.breakpoints.down('mobileSmall'));
  const isMobileLarge = useMediaQuery(theme.breakpoints.down('mobileLarge'));
  const isTabletPortrait = useMediaQuery(
    theme.breakpoints.down('tabletPortrait')
  );
  const isTabletLandscape = useMediaQuery(
    theme.breakpoints.down('tabletLandscape')
  );
  const isDesktop = useMediaQuery(theme.breakpoints.down('desktop'));
  const isWidescreen = useMediaQuery(theme.breakpoints.up('widescreen'));

  return {
    isBase,
    isMobileSmall,
    isMobileLarge,
    isTabletPortrait,
    isTabletLandscape,
    isDesktop,
    isWidescreen,
  };
}

export default useResponsive;
