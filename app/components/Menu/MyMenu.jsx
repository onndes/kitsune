import React, { useMemo, useState } from 'react';
import List from '@mui/material/List';
import { doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Paper, styled, Typography } from '@mui/material';
import { db } from '../../firebase';
import { CATEGORIES } from '../../common/consts/consts';
import ListCategories from './ListCategories';
import { setOpenedSubmenu } from '../../redux/slices/appSlice/appSlice';
import useMyTheme from '../../common/hooks/useMyTheme';

const PaperMenu = styled(Paper)(() => ({
  pt: 0,
  height: '100%',
  borderColor: '2px solid red',
  width: '270px',
}));

const ContainerMenu = styled(Container)(() => ({
  height: '100%',
  pt: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
}));

const WrapperTitle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 2),
  backgroundColor: theme.palette.background.heavyPrimary,
  borderRadius: '5px',
}));

const MyMenu = ({ drawerClose = () => {}, homePage }) => {
  const { mq } = useMyTheme();
  const dispatch = useDispatch();
  const [dense] = useState(false);
  const openedSubmenu = useSelector(({ app }) => app.openedSubmenu);

  const { categories, subcategories } = useSelector(({ category }) => category);

  const getListCategories = () => {
    const getFilteredSubCat = (path) =>
      subcategories.filter((subcat) => path === subcat.category.path);

    return categories.map((cat) => ({
      ...cat,
      subcategories: getFilteredSubCat(doc(db, CATEGORIES, cat.nameDoc).path),
    }));
  };

  const listCategories = useMemo(getListCategories, [
    categories,
    subcategories,
  ]);

  const handleClickItemMenu = (cat) => {
    if (cat.ukName === openedSubmenu) {
      dispatch(setOpenedSubmenu(''));
    } else {
      dispatch(setOpenedSubmenu(cat.ukName));
    }
  };

  return (
    <PaperMenu elevation={0}>
      <ContainerMenu maxWidth="false" disableGutters sx={{ pl: mq ? 0 : 2 }}>
        <WrapperTitle>
          <Typography
            variant="p"
            color="#4b566b"
            fontSize="17px"
            fontWeight="600"
            letterSpacing="1px"
          >
            Категорії
          </Typography>
        </WrapperTitle>

        <List
          dense={dense}
          disablePadding
          sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
        >
          {listCategories.length > 0 && (
            <ListCategories
              listCategories={listCategories}
              openedSubmenu={openedSubmenu}
              handleClickItemMenu={handleClickItemMenu}
              drawerClose={drawerClose}
              homePage={homePage}
            />
          )}
        </List>
      </ContainerMenu>
    </PaperMenu>
  );
};

export default MyMenu;
