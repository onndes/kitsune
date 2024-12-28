'use client';

import React from 'react';
import Link from 'next/link'; // Импортируем Link из Next.js
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useMyTheme from '@/hooks/useMyTheme';
import { ICategory } from '@/types/products.types';
import { ICategoryWithSubcategory } from './ListCategories';
import { ItemButton, ItemText } from './styles';

export interface CategoryItemProps {
  cat: ICategoryWithSubcategory;
  handleClickItemMenu: (category: ICategory) => void;
  isOpen: boolean;
  homePage: boolean;
  currentOpenMenu: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  cat,
  handleClickItemMenu,
  isOpen,
  homePage,
}) => {
  const { colors } = useMyTheme();
  const isHaveSubcategories = cat.subcategories.length > 0;
  const iconArrow = !isHaveSubcategories ? null : isOpen ? (
    <ExpandLess />
  ) : (
    <ExpandMore />
  );
  const isCurrent =
    typeof window !== 'undefined' &&
    window.location.pathname.includes(cat.nameDoc?.trim());

  return (
    <Link
      href={`/products/${encodeURIComponent(cat.nameDoc.trim())}`}
      passHref
      legacyBehavior
    >
      <ItemButton
        onClick={() => handleClickItemMenu(cat)} // Добавляем вызов handleClickItemMenu
        сselected={isCurrent ? colors.primaryPink[500] : null}
        // sx={{ textDecoration: 'none' }}
      >
        <ItemText primary={cat.ukName} />
        {!homePage ? iconArrow : null}
      </ItemButton>
    </Link>
  );
};

export default CategoryItem;
