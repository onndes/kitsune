import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

interface IProps {
  handleLoadArchivedData: () => void;
  isName: boolean;
}

const ButtonLoadPrevData = ({ handleLoadArchivedData, isName }: IProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // Теперь мы уверены, что клиент загружен
    setIsClient(true);
  }, []);

  if (!isName ||   !isClient) return null;

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<DownloadRoundedIcon />}
      sx={{
        textTransform: 'none',
        borderRadius: '12px',
        borderWidth: '2px',
        fontSize: '14px',
        fontWeight: 500,
        padding: '8px 16px',
        marginBottom: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 192, 203, 0.1)',
        },
      }}
      onClick={() => handleLoadArchivedData()}
    >
      Завантажити попередні дані
    </Button>
  );
};

export default ButtonLoadPrevData;
