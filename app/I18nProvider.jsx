'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { dictionaries } from '../lib/i18n';

const I18nCtx = createContext({ lang: 'tr', setLang: () => {}, t: (p)=>p });
export function useI18n(){ return useContext(I18nCtx); }

function lookup(dict, path){ return path.split('.').reduce((a,k)=>a?a[k]:undefined, dict); }
function interpolate(str, vars){ if(!vars) return str; return str.replace(/\{\{(.*?)\}\}/g,(_,k)=>String(vars[k.trim()]??'')); }

export default function I18nProvider({ children }) {
  const [lang, setLang] = useState('tr');

  useEffect(() => { setLang(localStorage.getItem('lang') || 'tr'); }, []);
  useEffect(() => { localStorage.setItem('lang', lang); document.documentElement.lang = lang; }, [lang]);

  const t = (path, vars) => {
    const dict = dictionaries[lang] || dictionaries.tr;
    const raw = lookup(dict, path) || path;
    return typeof raw === 'string' ? interpolate(raw, vars) : raw;
  };

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}
