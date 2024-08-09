import { useTheme } from '@/lib/darkMode'
import { cn } from '@/lib/tailwind'
import { MoonIcon, SunIcon } from '@sanity/icons'

const themeCss = 'cursor-pointer p-[3px] rounded-md'

const unselectedCss =
  'transition duration-150 hover:bg-gray-300 dark:hover:bg-gray-600'

const selectedCss = 'bg-gray-300 dark:bg-gray-600'

const ThemeSwitcher = () => {
  const { setTheme, isDarkMode } = useTheme()

  return (
    <div className="absolute top-2 left-2 flex items-center gap-1 text-3xl text-gray-900 dark:text-white">
      <SunIcon
        onClick={() => setTheme('light')}
        className={cn(themeCss, isDarkMode ? unselectedCss : selectedCss)}
      />
      <span className="transform scale-y-75 text-gray-400 dark:text-gray-300 font-extralight">
        |
      </span>
      <MoonIcon
        onClick={() => setTheme('dark')}
        className={cn(themeCss, isDarkMode ? selectedCss : unselectedCss)}
      />
    </div>
  )
}

export default ThemeSwitcher
