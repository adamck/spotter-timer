import { useEffect, useState } from 'react'

const isDarkModeSet = () => {
  return document.documentElement.classList.contains('dark')
}

const updateTheme = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/**
 * Adds/removes `dark` class on <html>.
 * Intially defers to system theme preference and afterwards
 * persists user's selection to localStorage.
 */
export const useTheme = () => {
  const [isDarkMode, setDarkMode] = useState(false)

  const setTheme = (theme: 'light' | 'dark') => {
    localStorage.theme = theme
    setDarkMode(theme === 'dark')
    updateTheme()
  }

  useEffect(() => {
    setDarkMode(isDarkModeSet())
  }, [])

  return {
    isDarkMode,
    setTheme,
  }
}
