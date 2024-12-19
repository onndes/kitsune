import { Collapse, List } from '@mui/material';
import React from 'react';
import CategoryItem from './CategoryItem';
import SubcategoryItem from './SubcategoryItem';

const ListCategories = ({
  listCategories,
  openedSubmenu,
  handleClickItemMenu,
  drawerClose,
  homePage,
}) => {
  return listCategories
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map((cat) => {
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
