import { useEffect, useState } from 'react'

export const isDarkModeSet = () => {
  return document.documentElement.classList.contains('dark')
}

export const useTheme = () => {
  const [isDarkMode, setDarkMode] = useState(false)

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
