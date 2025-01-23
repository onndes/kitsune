import { Box, Button } from '@mui/material';
import React from 'react';

interface ILoadingMoreButtonProps {
  show: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function LoadingMoreButton({
  show,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ILoadingMoreButtonProps) {
  return (
    show && (
      <Box display="flex" justifyContent="center">
        <Button
          sx={{ height: '100%', fontWeight: 600 }}
          onClick={() => fetchNextPage()}
          type="submit"
          disabled={!hasNextPage}
          variant="outlined"
          size="large"
          loading={isFetchingNextPage}
        >
          Завантажити ще
        </Button>
      </Box>
    )
  );
}
