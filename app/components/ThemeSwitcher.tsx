'use client' // Убедитесь, что файл будет обработан как клиентский

import { IconButton } from '@mui/material'
import {
  Brightness4,
  Brightness7,
} from '@mui/icons-material'
import { useState, useEffect } from 'react'

const ThemeSwitcher = () => {
  const [mode, setMode] = useState<'light' | 'dark' | null>(
    null,
  )

  useEffect(() => {
    // Доступ к localStorage только на клиенте
    const savedMode = localStorage.getItem('colorMode') as
      | 'light'
      | 'dark'
      | null
    if (savedMode) {
      setMode(savedMode)
    } else {
      setMode('light') // Устанавливаем по умолчанию светлый режим
    }
  }, [])

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('colorMode', newMode) // Сохраняем новый режим в localStorage
  }

  // Если состояние не установлено, ничего не рендерим (например, на сервере)
  if (mode === null) return null

  return (
    <IconButton onClick={toggleColorMode}>
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  )
}

export default ThemeSwitcher
