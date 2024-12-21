'use client';
import React, { createContext, useContext } from 'react';

interface DeviceContextProps {
  isMobile: boolean;
}

const DeviceContext = createContext<DeviceContextProps | null>(null);

export const DeviceProvider = ({
  isMobile,
  children,
}: {
  isMobile: boolean;
  children: React.ReactNode;
}) => {
  return (
    <DeviceContext.Provider value={{ isMobile }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
