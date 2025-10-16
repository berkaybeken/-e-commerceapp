'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeCtx = createContext({ theme: 'system', setTheme: () => {} });
export function useTheme(){ return useContext(ThemeCtx); }

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');

  const apply = (next) => {
    setTheme(next);
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', next);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = next === 'dark' || (next === 'system' && systemDark);
    document.documentElement.classList.toggle('dark', isDark);
  };

  useEffect(() => { apply(localStorage.getItem('theme') || 'system'); }, []);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if ((localStorage.getItem('theme') || 'system') === 'system') apply('system'); };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return <ThemeCtx.Provider value={{ theme, setTheme: apply }}>{children}</ThemeCtx.Provider>;
}
