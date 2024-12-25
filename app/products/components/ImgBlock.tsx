import { Box, BoxProps } from '@mui/system';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface ImgBlockProps {
  src: string;
  handleClickProduct: () => void;
  boxProps?: BoxProps;
  lazy?: boolean;
}

const ImgBlock: React.FC<ImgBlockProps> = ({
  src,
  handleClickProduct,
  boxProps = {},
}) => {
  const [width, setWidth] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleResize() {
      if (boxRef.current) {
        setWidth(boxRef.current.offsetWidth);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      ref={boxRef}
      {...boxProps}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: width,
        p: 1,
        img: {
          maxWidth: '100%',
          maxHeight: '100%',
        },
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={handleClickProduct}
    >
      <Image
        sizes="100%"
        src={src}
        alt="Product Image"
        fill
        style={{
          objectFit: 'cover',
        }}
        loading="lazy"
      />
    </Box>
  );
};

export default ImgBlock;
