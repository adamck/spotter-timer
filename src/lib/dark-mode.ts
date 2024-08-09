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

export const setTheme = (theme: 'light' | 'dark') => {
  localStorage.theme = theme
  updateTheme()
}

// Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem('theme')
