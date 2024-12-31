import { useContext } from 'react';
import { ColorModeContext } from '@/app/contexts/ColorModeContext';
import { ColorModeContextType } from '@/types/styles';

export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};
