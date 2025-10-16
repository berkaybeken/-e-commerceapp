'use client';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../app/I18nProvider';

function FlagTR({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#e30a17" d="M0 0h640v480H0z"/>
      <circle cx="304" cy="240" r="120" fill="#fff"/>
      <circle cx="328" cy="240" r="96" fill="#e30a17"/>
      <path fill="#fff" d="m390 240-66 21.4 40.8-56.1v69.4l-40.8-56.1z"/>
    </svg>
  );
}

function FlagUS({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 7410 3900" className={className} aria-hidden="true">
      <path fill="#b22234" d="M0 0h7410v3900H0z"/>
      <path stroke="#fff" strokeWidth="300" d="M0 450h7410M0 1050h7410M0 1650h7410M0 2250h7410M0 2850h7410M0 3450h7410"/>
      <path fill="#3c3b6e" d="M0 0h2964v2100H0z"/>
      <g fill="#fff">
        {Array.from({length:9}).map((_, r)=>
          Array.from({length:11 - (r%2)}).map((_, c)=>{
            const x = 135 + (r%2 ? 270 : 0) + c*540;
            const y = 150 + r*233;
            return (
              <polygon key={`${r}-${c}`} transform={`translate(${x},${y}) scale(9)`} points="0,-5 1.5,-1.5 5, -1.5 2,0.5 3.5,4 0,2 -3.5,4 -2,0.5 -5,-1.5 -1.5,-1.5"/>
            );
          })
        )}
      </g>
    </svg>
  );
}

export default function LangSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onKey(e){ if(e.key==='Escape') setOpen(false); }
    function onClick(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('click', onClick); };
  }, []);

  const current = lang === 'tr'
    ? { code: 'TR', label: 'Türkçe', icon: <FlagTR/> }
    : { code: 'EN', label: 'English', icon: <FlagUS/> };

  return (
    <div className="relative" ref={ref}>
      <button
        className="btn rounded-xl px-3 py-2 inline-flex items-center gap-2"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        {current.icon}
        <span>{current.code}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-40 rounded-2xl card-skin p-2 z-50"
        >
          <button
            role="option"
            aria-selected={lang==='tr'}
            className={`w-full btn rounded-xl justify-start ${lang==='tr' ? 'bg-black/5 dark:bg-white/10' : ''}`}
            onClick={() => { setLang('tr'); setOpen(false); }}
          >
            <FlagTR/>
            <span className="ml-2">Türkçe</span>
          </button>
          <button
            role="option"
            aria-selected={lang==='en'}
            className={`mt-2 w-full btn rounded-xl justify-start ${lang==='en' ? 'bg-black/5 dark:bg白/10'.replace('白','white') : ''}`}
            onClick={() => { setLang('en'); setOpen(false); }}
          >
            <FlagUS/>
            <span className="ml-2">English</span>
          </button>
        </div>
      )}
    </div>
  );
}
