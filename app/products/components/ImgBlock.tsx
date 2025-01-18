import { Box, BoxProps, SystemStyleObject } from '@mui/system';
import Image from 'next/image';

interface Props {
  src: string;
  handleClickProduct?: () => void;
  boxProps?: BoxProps;
  lazy?: boolean;
  index?: number | undefined;
  sxProps?: SystemStyleObject;
  sxImageProps?: SystemStyleObject;
}

const ImgBlock = ({
  src,
  handleClickProduct = () => {},
  sxProps = {},
  sxImageProps = {},
  index,
}: Props) => {
  const isPriority = index === undefined || index >= 16 ? undefined : true;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        img: {
          ...sxImageProps,
        },
        position: 'relative',
        cursor: 'pointer',
        ...sxProps,
      }}
      onClick={() => handleClickProduct()}
    >
      <Image
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
        src={src}
        alt="Product Image"
        width={160}
        height={160}
      />
    </Box>
  );
};

export default ImgBlock;
