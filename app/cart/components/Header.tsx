import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';

interface HeaderProps {
  handleClose: () => void;
}

const Header = ({ handleClose }: HeaderProps) => {
  return (
    <Box
      sx={() => ({
        position: 'absolute',
        width: '100%',
        bgcolor: 'white',
        zIndex: 1,
        top: 0,
        left: 0,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, .2)',
      })}
    >
      <Typography id="modal-modal-title" variant="h4" component="h2">
        Кошик
      </Typography>
      <IconButton aria-label="Close" onClick={handleClose}>
        <CloseIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default Header;
