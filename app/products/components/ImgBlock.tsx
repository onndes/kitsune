import { Box, BoxProps, SystemStyleObject } from '@mui/system';
import Image from 'next/image';

interface ImgBlockProps {
  src: string;
  handleClickProduct?: () => void;
  boxProps?: BoxProps;
  lazy?: boolean;
  index?: number;
  sxProps?: SystemStyleObject;
  sxImgageProps?: SystemStyleObject;
}

const ImgBlock: React.FC<ImgBlockProps> = ({
  src,
  handleClickProduct = () => {},
  sxProps = {},
  sxImgageProps = {},
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        img: {
          ...sxImgageProps,
        },
        position: 'relative',
        cursor: 'pointer',
        ...sxProps,
      }}
      onClick={() => handleClickProduct()}
    >
      <Image
        src={src}
        alt="Product Image"
        width={160}
        height={160}
        loading="lazy"
      />
    </Box>
  );
};

export default ImgBlock;
