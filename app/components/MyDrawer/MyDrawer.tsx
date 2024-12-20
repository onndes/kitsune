import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import MyMenu from '../Menu/MyMenu';

export default function MyDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => {
    setState(open);
  };

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
        <Box
          sx={{
            width: 270,
          }}
          role="presentation"
          // onClick={toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <Box
            sx={{
              display: 'flex',
              pl: 2,
              pt: 2,
              pb: 2,
              alignItems: 'center',
            }}
          >
            <Typography
              color="text.primary"
              variant="h3"
              component="div"
              fontWeight="900"
              sx={{ flexGrow: 1 }}
            >
              ELLEMOD
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="default"
              aria-label="menuClose"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer(false)}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider />
          <MyMenu drawer drawerClose={() => toggleDrawer(false)} />
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
