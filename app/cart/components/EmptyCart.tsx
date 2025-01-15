import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const EmptyCart = () => {
  return (
    <Box textAlign="center" mb={5}>
      <Box maxWidth="200px" display="inline-block" pt={5}>
        <Image
          src="/image/cartEmpty.png"
          alt="Cart empty"
          width={200}
          height={200}
        />
      </Box>
      <Typography variant="h4" color="text.primary" fontWeight={600} pb={5}>
        Oops... the basket is empty
      </Typography>
      <Link href="/" passHref>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '200px',
            height: '34px',
            fontSize: '18px',
            color: 'white',
          }}
        >
          Back
        </Button>
      </Link>
    </Box>
  );
};

export default EmptyCart;
