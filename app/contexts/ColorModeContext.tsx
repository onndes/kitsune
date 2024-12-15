'use client' // Ensure this file is treated as a client-side component

import {
  createContext,
  useState,
  useMemo,
  useContext,
  ReactNode,
  useEffect,
} from 'react'

// Тип для контекста (светлая/тёмная тема)
interface ColorModeContextType {
  mode: 'light' | 'dark' // Текущий режим темы
  toggleColorMode: () => void // Функция для переключения темы
}

// Создаём контекст с дефолтным значением
export const ColorModeContext =
  createContext<ColorModeContextType>({
    mode: 'light', // По умолчанию светлая тема
    toggleColorMode: () => {}, // Пустая функция по умолчанию
  })

// Хук для использования контекста
export const useColorMode = () =>
  useContext(ColorModeContext)

// Поставщик для ColorModeContext
export const ColorModeProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    'light',
  )

  // Используем useEffect для работы с localStorage только на клиенте
  useEffect(() => {
    // Проверяем, доступен ли localStorage
    const savedMode = localStorage.getItem('colorMode') as
      | 'light'
      | 'dark'
      | null
    if (savedMode) {
      setMode(savedMode)
    } else {
      setMode('light') // Если значения нет, устанавливаем светлый режим по умолчанию
    }
  }, [])

  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('colorMode', newMode) // Сохраняем выбранный режим в localStorage
      return newMode
    })
  }

  const value = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode],
  )

  // Оборачиваем детей в Provider с переданным значением
  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  )
}
