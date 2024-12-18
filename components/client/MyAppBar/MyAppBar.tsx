// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import { Badge } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import { useSelector } from 'react-redux';
// import useMyTheme from '../../common/hooks/useMyTheme';
// import SearchInput from './SearchInput';
// import MyDrawer from '../DrawerMenu.jsx/MyDrawer';
// import logo from '../../assets/logo.svg';
// import useScrollPosition from '../../common/hooks/useScrollPosition';

// export default function MyAppBar() {
//   const { mq } = useMyTheme();
//   const [auth] = React.useState(true);
//   const navigate = useNavigate();
//   const cartProduct = useSelector(({ cart }) => cart.products);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const position = useScrollPosition();

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const count = cartProduct.reduce((sum, el) => {
//     return sum + el.count;
//   }, 0);

//   return (
//     <Box>
//       <AppBar
//         elevation={position > 10 ? 5 : 0}
//         position="fixed"
//         pt={2}
//         sx={{
//           background: 'background',
//         }}
//       >
//         <Container maxWidth="lg">
//           <Toolbar
//             disableGutters
//             sx={{
//               pt: 2,
//               pb: 2,
//               background: 'background',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               gap: 2,
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//               }}
//             >
//               {mq && <MyDrawer />}
//               <Typography
//                 color="text.primary"
//                 variant="h3"
//                 component="div"
//                 fontWeight="700"
//                 sx={{
//                   flexGrow: 1,
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                 }}
//                 onClick={() => navigate('')}
//               >
//                 <img width="40px" src={logo} alt="" />
//                 KITSUNE
//               </Typography>
//             </Box>
//             {!mq && <SearchInput />}
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               {auth && (
//                 <>
//                   <IconButton
//                     aria-label="account of current user"
//                     aria-controls="menu-appbar"
//                     aria-haspopup="true"
//                     onClick={() => navigate('/cart')}
//                     color="default"
//                     sx={{
//                       backgroundColor: '#F3F5F9',
//                     }}
//                   >
//                     <Badge
//                       badgeContent={count}
//                       color="primary"
//                       max={999}
//                       sx={{
//                         '& .MuiBadge-badge': {
//                           fontSize: '13px',
//                           color: 'white',
//                           pt: '1px',
//                           pr: '7px',
//                         },
//                       }}
//                     >
//                       <ShoppingCartIcon
//                         fontSize={mq ? '15px' : '30px'}
//                         p={0.5}
//                       />
//                     </Badge>
//                   </IconButton>
//                   <Menu
//                     id="menu-appbar"
//                     anchorEl={anchorEl}
//                     anchorOrigin={{
//                       vertical: 'top',
//                       horizontal: 'right',
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: 'top',
//                       horizontal: 'right',
//                     }}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                   >
//                     <MenuItem onClick={handleClose}>Profile</MenuItem>
//                     <MenuItem onClick={handleClose}>My account</MenuItem>
//                   </Menu>
//                 </>
//               )}
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </Box>
//   );
// }
