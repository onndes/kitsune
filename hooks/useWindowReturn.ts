import { useState, useEffect } from 'react';

interface UseWindowWidthReturn {
  width: number | null; // null до гидратации
  isMobile: boolean | null; // null до гидратации
}

const useWindowWidth = (breakpoint: number = 900): UseWindowWidthReturn => {
  const [width, setWidth] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      setIsMobile(currentWidth <= breakpoint);
    };

    // Инициализируем ширину при монтировании
    updateWidth();

    // Слушаем изменения размера окна
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [breakpoint]);

  return { width, isMobile };
};

export default useWindowWidth;
