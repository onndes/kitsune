import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledButton,
} from './styles';
// import { useDevice } from '@/app/contexts/DeviceContextProps';
import useResponsive from '@/hooks/useResponsive';
import { useDevice } from '@/app/contexts/DeviceContextProps';

const SearchInput = () => {
  const { isMobile } = useDevice();
  const { isMobileLarge } = useResponsive();

  const shouldShowMobile = isMobileLarge || isMobile;

  return (
    <Search sx={{ display: !shouldShowMobile ? 'felx' : 'none' }}>
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
