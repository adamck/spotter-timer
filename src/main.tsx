import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Timer from './Timer.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex items-center justify-center min-h-lvh bg-brand-50">
      <Timer />
    </div>
  </StrictMode>
)
