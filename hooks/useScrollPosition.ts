import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setCurrentPosition(window.scrollY);
    };

    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return currentPosition;
};

export default useScrollPosition;
