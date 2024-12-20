import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledButton,
} from './styles';
import useMyTheme from '@/hooks/useMyTheme';

const SearchInput = () => {
  const { mq } = useMyTheme();

  return !mq ? (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="action" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Searching for..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <StyledButton variant="contained" color="primary">
        Search
      </StyledButton>
    </Search>
  ) : null;
};

export default SearchInput;
