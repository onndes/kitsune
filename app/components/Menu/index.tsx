'use client';

import { useState, FC, useMemo } from 'react';
import List from '@mui/material/List';
import {
  StyledContainerMenu,
  StyledPaperMenu,
  StyledTitleTypography,
  StyledWrapperTitle,
} from './styles';
import Grid from '@mui/material/Grid2';
import { ICategory, ISubCategoryWithPath } from '@/types/products.types';
import { db } from '@/firebase';
import { setOpenedSubmenu } from '@/redux/appSlice';
import { RootState } from '@/redux/store';
import { EnumFirestoreCollections } from '@/types/enums';
import { doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import ListCategories from './ListCategories';
import { useDispatch } from 'react-redux';
import { useDevice } from '@/app/contexts/DeviceContextProps';

interface MyMenuProps {
  drawerClose?: () => void;
  homePage: boolean;
  categories: ICategory[];
  subcategories: ISubCategoryWithPath[];
  drawer: boolean;
}

const MyMenu: FC<MyMenuProps> = ({
  categories,
  subcategories,
  drawerClose = () => {},
  homePage,
  drawer,
}) => {
  // const { isMobile } = useWindowWidth();
  const { isMobile } = useDevice();
  const [dense] = useState(false);
  const dispatch = useDispatch();
  const openedSubmenu = useSelector(
    (state: RootState) => state.app.openedSubmenu
  );

  const listCategories = useMemo(() => {
    const getFilteredSubCat = (path: string) =>
      subcategories.filter(
        (subcat: ISubCategoryWithPath) => path === subcat.category
      );

    return categories.map((cat: ICategory) => ({
      ...cat,
      subcategories: getFilteredSubCat(
        doc(db, EnumFirestoreCollections.CATEGORIES, cat.nameDoc).path
      ),
    }));
  }, [categories, subcategories]);

  const handleClickItemMenu = (cat: ICategory) => {
    if (cat.ukName === openedSubmenu) {
      dispatch(setOpenedSubmenu(''));
    } else {
      dispatch(setOpenedSubmenu(cat.ukName));
    }
  };

  if (isMobile && !drawer) return null;

  return (
    <Grid width="270px">
      <StyledPaperMenu elevation={0}>
        <StyledContainerMenu
          maxWidth={false}
          disableGutters
          sx={{ pl: isMobile ? 0 : 2 }}
        >
          <StyledWrapperTitle>
            <StyledTitleTypography>Категорії</StyledTitleTypography>
          </StyledWrapperTitle>

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
        </StyledContainerMenu>
      </StyledPaperMenu>
    </Grid>
  );
};

export default MyMenu;
