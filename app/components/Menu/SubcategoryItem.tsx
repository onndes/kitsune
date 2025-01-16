'use client';

import React from 'react';
import { ListItemText } from '@mui/material';
import Link from 'next/link';
import { StyledListItemButton, StyledTypography } from './styles';
import { ICategory, ISubCategoryWithPath } from '@/types/products.t';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface SubcategoryItemProps {
  sub: ISubCategoryWithPath;
  drawerClose?: () => void;
  cat: ICategory;
  handleClickItemSubcategory: (subcategory: string) => void;
}

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({
  sub,
  drawerClose,
  cat,
  handleClickItemSubcategory,
}) => {
  const acriveSubcategory = useSelector(
    (state: RootState) => state.app.activeSubcategory
  );

  const isActiveSubcategory = acriveSubcategory === sub.nameDoc;

  const handleClick = () => {
    handleClickItemSubcategory(sub.nameDoc);
    if (drawerClose) {
      drawerClose();
    }
  };

  const link = `/products/${encodeURIComponent(cat.nameDoc.trim())}/${encodeURIComponent(sub?.nameDoc.trim())}`;

  return (
    <Link href={link} passHref style={{ textDecoration: 'none' }}>
      <StyledListItemButton
        onClick={handleClick}
        isСurrent={isActiveSubcategory}
      >
        <ListItemText
          primary={
            <StyledTypography variant="body2" isСurrent={isActiveSubcategory}>
              {sub.ukName}
            </StyledTypography>
          }
        />
      </StyledListItemButton>
    </Link>
  );
};

export default SubcategoryItem;
