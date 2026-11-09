import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Sun size={17} aria-hidden="true" className="theme-icon sun" />
      ) : (
        <Moon size={17} aria-hidden="true" className="theme-icon moon" />
      )}
      <span className="sr-only">{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</span>
    </button>
  )
}
