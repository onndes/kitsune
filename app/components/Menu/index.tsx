'use client';

import { FC, useMemo } from 'react';
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
import { setActiveSubcategory, setOpenedSubmenu } from '@/redux/appSlice';
import { RootState } from '@/redux/store';
import { EnumFirestoreCollections } from '@/types/enums';
import { doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import ListCategories from './ListCategories';
import { useDispatch } from 'react-redux';
import { useDevice } from '@/app/contexts/DeviceContextProps';
import useResponsive from '@/hooks/useResponsive';

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
  const { isMobile } = useDevice();
  const { isTabletPortrait } = useResponsive();
  const dense = false;
  const dispatch = useDispatch();
  const { openedSubmenu } = useSelector((state: RootState) => state.app);

  const listCategories = useMemo(() => {
    const getFilteredSubCat = (path: string) =>
      subcategories.filter((el: ISubCategoryWithPath) => path === el.category);

    return categories.map((cat: ICategory) => ({
      ...cat,
      subcategories: getFilteredSubCat(
        doc(db, EnumFirestoreCollections.CATEGORIES, cat.nameDoc).path
      ),
    }));
  }, [categories, subcategories]);

  const handleClickItemMenu = (cat: ICategory) => {
    if (cat.nameDoc === openedSubmenu) {
      dispatch(setOpenedSubmenu(''));
    } else {
      dispatch(setOpenedSubmenu(cat.nameDoc));
    }
  };

  const handleClickItemSubcategory = (subcategory: string) => {
    dispatch(setActiveSubcategory(subcategory));
  };

  if ((isMobile || isTabletPortrait) && !drawer) {
    return null;
  }

  return (
    <Grid
      width="270px"
      sx={{
        position: 'sticky',
        top: 67,
        height: '100%',
        overflowY: 'auto',
        alignSelf: 'start',
      }}
    >
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
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              paddingBottom: '35px',
            }}
          >
            {listCategories.length > 0 && (
              <ListCategories
                listCategories={listCategories}
                openedSubmenu={openedSubmenu}
                handleClickItemMenu={handleClickItemMenu}
                drawerClose={drawerClose}
                homePage={homePage}
                handleClickItemSubcategory={handleClickItemSubcategory}
              />
            )}
          </List>
        </StyledContainerMenu>
      </StyledPaperMenu>
    </Grid>
  );
};

export default MyMenu;
