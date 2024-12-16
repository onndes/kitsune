'use client'

import { ReactNode } from 'react'
import { ColorModeProvider } from './contexts/ColorModeContext' // Импортируем провайдер
import { CssBaseline } from '@mui/material'

const ThemeWrapper = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <ColorModeProvider>
      <CssBaseline />
      {children}
    </ColorModeProvider>
  )
}

export default ThemeWrapper
