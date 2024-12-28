import React, { useState } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import ImgBlock from '@/app/products/components/ImgBlock';
import useResponsive from '@/hooks/useResponsive';

interface ImageBlockSliderProps {
  image: string[];
}

const ImageBlockSlider: React.FC<ImageBlockSliderProps> = ({ image }) => {
  const imageCut = image.slice(0, 4); // Отображаем максимум 4 изображения
  const { isTabletPortrait } = useResponsive();
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const settingsMain = {
    infinite: false,
    arrows: false,
    slidesToShow: 1,
    beforeChange: (_oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
  };

  const settingsNav = {
    infinite: false,
    arrows: false,
    slidesToShow: imageCut.length > 1 ? imageCut.length : 1,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  const sizeNav = isTabletPortrait ? '75px' : '100px';

  return (
    <Box
      sx={{
        width: '100%',
        div: {
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        },
      }}
    >
      {/* Основной слайдер */}
      <Slider
        asNavFor={nav2 || undefined}
        ref={(slider1) => setNav1(slider1)}
        {...settingsMain}
      >
        {imageCut.map((img) => (
          <ImgBlock
            key={img}
            src={img}
            sxProps={{
              maxWidth: '300px',
              minHeight: '250px',
              mb: 1,
            }}
            sxImgageProps={{
              maxHeight: isTabletPortrait ? '250px' : '350px',
              height: '100%',
            }}
          />
        ))}
      </Slider>

      {/* Навигационный слайдер */}
      <Slider
        asNavFor={nav1 || undefined}
        ref={(slider2) => setNav2(slider2)}
        {...settingsNav}
      >
        {imageCut.map((img, idx) => (
          <ImgBlock
            key={img}
            src={img}
            sxProps={{
              maxWidth: sizeNav,
              width: sizeNav,
              height: sizeNav,
              mb: 2,
              position: 'relative',
              '&:before': {
                display: 'block',
                position: 'absolute',
                content: "''",
                width: '100%',
                height: '100%',
                border:
                  idx === currentSlide ? '1px solid lightGrey' : undefined,
              },
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ImageBlockSlider;
