import { ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS_ROUTE } from '../../common/consts/ROUTES';
import useMyTheme from '../../common/hooks/useMyTheme';

const SubcategoryItem = ({ sub, drawerClose, cat }) => {
  const handleClick = () => {
    drawerClose();
  };
  const { colors } = useMyTheme();
  const { subcategory } = useParams();
  const isCurrent = subcategory?.trim() === sub.nameDoc.trim();

  return (
    <ListItemButton
      key={sub.id}
      sx={{ pl: 4 }}
      onClick={handleClick}
      component={Link}
      to={`${PRODUCTS_ROUTE}/${cat.nameDoc.trim()}/${sub.nameDoc.trim()}`}
    >
      <ListItemText
        // primary={sub.ukName}
        primary={
          <Typography
            variant="p"
            sx={{
              color: isCurrent ? colors.primaryPink[400] : '#5e6d87',
            }}
          >
            {sub.ukName}
          </Typography>
        }
        sx={{
          a: {
            div: {
              span: {
                color: 'red',
              },
            },
          },
        }}
      />
    </ListItemButton>
  );
};

export default SubcategoryItem;
