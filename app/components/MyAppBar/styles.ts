import { styled, Theme } from '@mui/material/styles';
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Menu,
  Button,
  TypographyProps,
  AppBar,
} from '@mui/material';

export const StyledLogoContainer = styled(Box)(
  ({ theme }: { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  })
);

export const StyledTypography = styled(Typography)<TypographyProps>(
  ({ theme }: { theme: Theme }) => ({
    flexGrow: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontSize: 24,
    fontWeight: 700,
    color: theme.palette.text.primary,
  })
);

export const Search = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '35px',
  border: '1px solid lightGrey',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  width: '500px',
}));

export const SearchIconWrapper = styled('div')(
  ({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
);

export const StyledInputBase = styled(InputBase)(
  ({ theme }: { theme: Theme }) => ({
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
    },
  })
);

export const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  color: 'white',
  padding: theme.spacing(0, 4),
  fontWeight: 600,
  borderRadius: '0px',
  textTransform: 'initial',
  fontSize: '0.9rem',
}));

export const StyledIconButton = styled(IconButton)(
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: '#F3F5F9',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  })
);

export const StyledBadge = styled(Badge)(({ theme }: { theme: Theme }) => ({
  '& .MuiBadge-badge': {
    fontSize: '13px',
    color: 'white',
    paddingTop: '1px',
    paddingRight: '7px',
    backgroundColor: theme.palette.primary.main,
  },
}));

export const StyledMenu = styled(Menu)(({ theme }: { theme: Theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    minWidth: 150,
    backgroundColor: theme.palette.background.default,
  },
}));

export const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[2],
  position: 'fixed',
}));

export const StyledToolbar = styled(Box)(({ theme }: { theme: Theme }) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    gap: theme.spacing(2),
  };
});
