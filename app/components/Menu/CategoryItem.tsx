'use client';

import React from 'react';
import Link from 'next/link';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useMyTheme from '@/hooks/useMyTheme';
import { ICategory } from '@/types/products.t';
import { ICategoryWithSubcategory } from './ListCategories';
import { ItemButton, ItemText } from './styles';

export interface CategoryItemProps {
  cat: ICategoryWithSubcategory;
  handleClickItemMenu: (category: ICategory) => void;
  handleClickItemSubcategory: (subcategory: string) => void;
  isOpen: boolean;
  homePage: boolean;
  currentOpenMenu: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  cat,
  handleClickItemMenu,
  isOpen,
  homePage,
  currentOpenMenu,
  handleClickItemSubcategory,
}) => {
  const { colors } = useMyTheme();
  const isHaveSubcategories = cat.subcategories.length > 0;
  const iconArrow = !isHaveSubcategories ? null : isOpen ? (
    <ExpandLess />
  ) : (
    <ExpandMore />
  );

  return (
    <Link
      href={`/products/${encodeURIComponent(cat.nameDoc.trim())}`}
      passHref
      legacyBehavior
    >
      <ItemButton
        onClick={() => {
          handleClickItemMenu(cat);
          handleClickItemSubcategory('');
        }}
        сselected={currentOpenMenu ? colors.primaryPink[500] : null}
      >
        <ItemText primary={cat.ukName} />
        {!homePage ? iconArrow : null}
      </ItemButton>
    </Link>
  );
};

export default CategoryItem;
