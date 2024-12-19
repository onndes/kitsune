/* eslint-disable no-nested-ternary */
import React from 'react';
import { ListItemButton, ListItemText, styled } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useMyTheme from '../../common/hooks/useMyTheme';
import { PRODUCTS_ROUTE } from '../../common/consts/ROUTES';

const ItemButton = styled(ListItemButton)(({ theme, сselected }) => {
  const { colors } = useMyTheme();

  return {
    padding: theme.spacing(1, 1, 1, 1),
    cursor: 'pointer',
    backgroundColor: '#F3F5F9',
    div: {
      color: сselected,
    },
    '&:hover': {
      backgroundColor: theme.palette.background.mediumPrimary,
      div: {
        color: colors.primaryPink[400],
        span: {
          color: colors.primaryPink[400],
        },
      },
    },
  };
});

const ItemText = styled(ListItemText)(() => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#5e6d87',
}));

const CategoryItem = ({ cat, handleClickItemMenu, isOpen, homePage }) => {
  const { colors } = useMyTheme();
  const isHaveSubcategories = cat.subcategories.length > 0;
  const iconArrow = !isHaveSubcategories ? null : isOpen ? (
    <ExpandLess />
  ) : (
    <ExpandMore />
  );
  const { category } = useParams();
  const isCurrent = category?.trim() === cat.nameDoc?.trim();
  return (
    <ItemButton
      component={Link}
      to={!isOpen && `${PRODUCTS_ROUTE}/${cat.nameDoc.trim()}`}
      onClick={() => {
        handleClickItemMenu(cat);
      }}
      key={cat.id}
      сselected={isCurrent ? colors.primaryPink[500] : null}
    >
      <ItemText primary={cat.ukName} />
      {!homePage ? iconArrow : null}
    </ItemButton>
  );
};

export default CategoryItem;
