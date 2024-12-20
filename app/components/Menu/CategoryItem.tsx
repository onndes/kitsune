'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const router = useRouter();
  const isCurrent = pathname.includes(cat.nameDoc?.trim());

  return (
    <ItemButton
      onClick={() => {
        handleClickItemMenu(cat);
        if (!isOpen) {
          router.push(`/products/${cat.nameDoc.trim()}`);
        }
      }}
      сselected={isCurrent ? colors.primaryPink[500] : null}
    >
      <ItemText primary={cat.ukName} />
      {!homePage ? iconArrow : null}
    </ItemButton>
  );
};

export default CategoryItem;
