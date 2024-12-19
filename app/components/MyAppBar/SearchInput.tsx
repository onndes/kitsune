import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledButton,
} from './styles';

const SearchInput = () => {
  return (
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
  );
};

export default SearchInput;
