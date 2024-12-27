import { Collapse, List } from '@mui/material';
import React, { FC } from 'react';
import SubcategoryItem from './SubcategoryItem';
import { ICategory, ISubCategoryWithPath } from '@/types/products.types';
import CategoryItem from './CategoryItem';

export interface ICategoryWithSubcategory extends ICategory {
  subcategories: ISubCategoryWithPath[];
}

interface ListCategoriesProps {
  listCategories: ICategoryWithSubcategory[];
  openedSubmenu: string;
  handleClickItemMenu: (category: ICategory) => void;
  drawerClose?: () => void;
  homePage: boolean;
}

const ListCategories: FC<ListCategoriesProps> = ({
  listCategories,
  openedSubmenu,
  handleClickItemMenu,
  drawerClose,
  homePage,
}) => {
  return listCategories
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map((cat) => {
      console.log(openedSubmenu, cat.ukName);
      const isOpen = openedSubmenu === cat.ukName;

      return (
        <React.Fragment key={cat.id}>
          <CategoryItem
            homePage={homePage}
            cat={cat}
            handleClickItemMenu={handleClickItemMenu}
            currentOpenMenu={isOpen}
            isOpen={isOpen}
          />
          {!homePage && cat.subcategories.length > 0 && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {cat.subcategories.map((sub) => (
                  <SubcategoryItem
                    drawerClose={drawerClose}
                    sub={sub}
                    cat={cat}
                    key={sub.id}
                  />
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
};

export default ListCategories;
