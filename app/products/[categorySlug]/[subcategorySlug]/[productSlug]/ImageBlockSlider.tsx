import React, { useState } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import ImgBlock from '@/app/products/components/ImgBlock';
import useResponsive from '@/hooks/useResponsive';

interface ImageBlockSliderProps {
  image: string[];
}

const ImageBlockSlider: React.FC<ImageBlockSliderProps> = ({ image }) => {
  // const sliderRef = useRef<HTMLDivElement>(null); // Блокируем вертикальную прокрутку
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
  // TODO добавить стрелки на телефонах

  // Блокируем вертикальную прокрутку
  // const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
  //   if (sliderRef.current) {
  //     sliderRef.current.dataset.startY = String(e.touches[0].clientY);
  //   }
  // };

  // const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
  //   if (sliderRef.current) {
  //     const startY = parseFloat(sliderRef.current.dataset.startY || '0');
  //     const deltaY = e.touches[0].clientY - startY;

  //     if (Math.abs(deltaY) > 10) {
  //       e.preventDefault(); // Блокируем вертикальную прокрутку
  //     }
  //   }
  // };

  return (
    <Box
      // ref={sliderRef} // Блокируем вертикальную прокрутку
      // onTouchStart={handleTouchStart} // Блокируем вертикальную прокрутку
      // onTouchMove={handleTouchMove}  // Блокируем вертикальную прокрутку
      sx={{
        width: '100%',
        div: {
          display: 'flex',
          width: '100%',
        },
        overflow: 'hidden',
      }}
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
                maxHeight: '46px', // Отключаем растяжение
                margin: '0 auto', // Центрируем
              }}
              sxImgageProps={{
                padding: '2px',
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
