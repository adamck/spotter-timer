import ThemeSwitcher from '@/components/ThemeSwitcher.tsx'
import Timer from '@/components/Timer.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex items-center justify-center min-h-lvh bg-gray-200 dark:bg-brand-50">
      <ThemeSwitcher />
      <Timer />
    </div>
  </StrictMode>
)
