"use client"

import { ReactNode } from 'react'
import { StoreProvider } from './StoreProvider'
import { ColorModeProvider } from './contexts/ColorModeContext'
import { ThemeProvider } from '@mui/material/styles'
import { themeSettings } from './styles/theme' // Импортируем настройки темы
import { useColorMode } from './contexts/ColorModeContext'

const ThemeWrapper = ({
  children,
}: {
  children: ReactNode
}) => {
  const { mode } = useColorMode() // Получаем текущий режим (светлый/тёмный)

  // Генерация темы на основе текущего режима
  const theme = themeSettings(mode)

  return (
    <StoreProvider>
      <ColorModeProvider>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ColorModeProvider>
    </StoreProvider>
  )
}

export default ThemeWrapper
