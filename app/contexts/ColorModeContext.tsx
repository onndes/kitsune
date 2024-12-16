import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'

// Типы для контекста
interface ColorModeContextType {
  mode: 'light' | 'dark'
  toggleColorMode: () => void
}

// Создаём контекст
const ColorModeContext = createContext<
  ColorModeContextType | undefined
>(undefined)

export const ColorModeProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  // Инициализация состояния темы: по умолчанию 'light'
  const [mode, setMode] = useState<'light' | 'dark'>(
    'light',
  )

  useEffect(() => {
    // Проверка, доступен ли localStorage
    const savedMode = localStorage.getItem('colorMode') as
      | 'light'
      | 'dark'
      | null
    if (savedMode) {
      setMode(savedMode)
    }
  }, []) // Этот код выполнится только после первого рендера на клиенте

  // Используем useCallback для сохранения стабильности функции
  const toggleColorMode = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('colorMode', newMode) // Сохраняем новый режим в localStorage
  }, [mode]) // Пересоздаём функцию, если меняется mode

  // Мемоизируем контекст, чтобы избежать лишних рендеров
  const colorMode = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode, toggleColorMode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  )
}

export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext)
  console.log(context)
  if (!context) {
    throw new Error(
      'useColorMode must be used within a ColorModeProvider',
    )
  }
  return context
}
