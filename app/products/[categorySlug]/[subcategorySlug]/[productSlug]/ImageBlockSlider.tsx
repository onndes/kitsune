import React, { useState } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import ImgBlock from '@/app/products/components/ImgBlock';
import useResponsive from '@/hooks/useResponsive';

interface ImageBlockSliderProps {
  image: string[];
}

const ImageBlockSlider: React.FC<ImageBlockSliderProps> = ({ image }) => {
  // const imageCut = image.slice(0, 4); // Отображаем максимум 4 изображения
  const { isMobileLarge } = useResponsive();
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const settingsMain = {
    infinite: false,
    arrows: false,
    slidesToShow: 1,
    preventScrollOnSwipe: true,
    beforeChange: (_oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
  };

  const settingsNav = {
    className: 'slider variable-width',
    variableWidth: true,
    infinite: false,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
    // centerPadding: '0px', // Отступы по бокам
    slidesToShow: 9,
    preventScrollOnSwipe: true,
  };
  // TODO убрать вертикальний скролл на мобильных устройствах
  // TODO добавить стрелки на телефонах

  return (
    <Box
      sx={{
        width: '100%',
        div: {
          display: 'flex',
          width: '100%',
        },
        overflow: 'hidden',
        // touchAction: 'pan-y',
      }}
      onTouchMove={(e) => e.preventDefault()}
    >
      {/* Основной слайдер */}
      <Slider
        asNavFor={nav2 || undefined}
        ref={(slider1) => setNav1(slider1)}
        {...settingsMain}
      >
        {image.map((img) => (
          <ImgBlock
            key={img}
            src={img}
            sxImgageProps={{
              height: isMobileLarge ? '250px' : '250px',
              width: isMobileLarge ? '250px' : '250px',
            }}
          />
        ))}
      </Slider>
      {/* Навигационный слайдер */}

      {!isMobileLarge && (
        <Slider
          asNavFor={nav1 || undefined}
          ref={(slider2) => setNav2(slider2)}
          {...settingsNav}
          // centerMode
        >
          {image.map((img, idx) => (
            <ImgBlock
              key={img}
              src={img}
              sxProps={{
                border: idx === currentSlide ? '1px solid lightGreen' : 'none',
                padding: '0',

                maxWidth: '46px', // Отключаем растяжение
                margin: '0 auto', // Центрируем
              }}
              sxImgageProps={{
                padding: '3px',
                height: '46px',
                width: '46px',
                position: 'relative',
              }}
            />
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default ImageBlockSlider;
