'use client';
import { useTheme } from '../app/ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
  const label = theme === 'light' ? '🌞' : theme === 'dark' ? '🌚' : '🖥️';
  return (
    <button className="btn" onClick={() => setTheme(next)} title={`Tema: ${theme}`} aria-label="Tema">
      {label}
    </button>
  );
}
