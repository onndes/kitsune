'use client';

import React from 'react';
import { ListItemText } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StyledListItemButton, StyledTypography } from './styles';
import { ICategory, ISubCategoryWithPath } from '@/types/products.types';

export interface SubcategoryItemProps {
  sub: ISubCategoryWithPath;
  drawerClose?: () => void;
  cat: ICategory;
}

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({
  sub,
  drawerClose,
  cat,
}) => {
  const pathname = decodeURIComponent(usePathname());

  const isСurrent =
    pathname === `/products/${cat?.nameDoc.trim()}/${sub?.nameDoc.trim()}`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (drawerClose) {
      drawerClose();
    }
  };

  return (
    <Link
      href={`/products/${encodeURIComponent(cat.nameDoc.trim())}/${encodeURIComponent(sub?.nameDoc.trim())}`}
      passHref
      style={{ textDecoration: 'none' }}
    >
      <StyledListItemButton onClick={handleClick} isСurrent={isСurrent}>
        <ListItemText
          primary={
            <StyledTypography variant="body2" isСurrent={isСurrent}>
              {sub.ukName}
            </StyledTypography>
          }
        />
      </StyledListItemButton>
    </Link>
  );
};

export default SubcategoryItem;
