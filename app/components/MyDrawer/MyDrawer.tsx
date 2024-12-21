'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MyMenu from '../Menu';
import { ICategory, ISubCategoryWithPath } from '@/types/products.types';
import { useDevice } from '@/app/contexts/DeviceContextProps';

interface MyDrawerProps {
  categories: ICategory[];
  subcategories: ISubCategoryWithPath[];
  homePage: boolean;
}

const StyledDrawerContainer = styled(Box)(() => ({
  width: 270,
  role: 'presentation',
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  alignItems: 'center',
}));

const StyledTitle = styled(Typography)(() => ({
  flexGrow: 1,
  fontWeight: 900,
}));

export default function MyDrawer({
  categories,
  subcategories,
  homePage,
}: MyDrawerProps) {
  const [state, setState] = useState(false);
  const { isMobile } = useDevice();

  const toggleDrawer = (open: boolean) => {
    setState(open);
  };

  if (!isMobile) return null;

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="default"
        aria-label="menu"
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <StyledDrawerContainer onKeyDown={() => toggleDrawer(false)}>
          <StyledHeader>
            <StyledTitle color="text.primary" variant="h5">
              ELLEMOD
            </StyledTitle>
            <IconButton
              size="large"
              edge="start"
              color="default"
              aria-label="menuClose"
              onClick={() => toggleDrawer(false)}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </StyledHeader>
          <Divider />
          <MyMenu
            drawer={true}
            drawerClose={() => toggleDrawer(false)}
            categories={categories}
            subcategories={subcategories}
            homePage={homePage}
          />
        </StyledDrawerContainer>
      </SwipeableDrawer>
    </div>
  );
}
