'use client';
import { useState } from 'react';
import { useI18n } from '../I18nProvider';

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function LoginInline({ onSuccess, onClose }) {
  const { t } = useI18n();
  const [email, setEmail] = useState('demo@mobiversite.com');
  const [password, setPassword] = useState('123456');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErr, setFormErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');

  const validate = () => {
    let ok = true;
    if (!email || !isEmail(email)) { setEmailErr(t('login.emailInvalid')); ok = false; } else setEmailErr('');
    if (!password) { setPassErr(t('login.passwordRequired')); ok = false; } else setPassErr('');
    return ok;
  };

  async function submit(e) {
    e.preventDefault();
    setFormErr('');
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) { setFormErr(t('login.invalid')); return; }
      localStorage.setItem('auth', String(Date.now()));
      window.dispatchEvent(new Event('auth-change'));
      onSuccess?.();
    } catch {
      setFormErr(t('login.unexpected'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl card-skin p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">{t('login.title')}</h2>
          <button onClick={onClose} className="btn rounded-xl px-3 py-1.5">{t('login.close')}</button>
        </div>

        <form onSubmit={submit} className="space-y-3" noValidate>
          <div>
            <input
              className={`input w-full ${emailErr ? 'border-red-500' : ''}`}
              type="email"
              inputMode="email"
              placeholder={t('login.email')}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              onBlur={()=>{ if (!email || !isEmail(email)) setEmailErr(t('login.emailInvalid')); else setEmailErr(''); }}
              aria-invalid={!!emailErr}
              aria-describedby={emailErr ? 'modal-email-err' : undefined}
              autoComplete="email"
            />
            {emailErr && <p id="modal-email-err" className="mt-1 text-xs text-red-600">{emailErr}</p>}
          </div>

          <div className="flex items-stretch gap-2">
            <input
              className={`input w-full ${passErr ? 'border-red-500' : ''}`}
              type={show ? 'text' : 'password'}
              placeholder={t('login.password')}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              onBlur={()=>{ if (!password) setPassErr(t('login.passwordRequired')); else setPassErr(''); }}
              aria-invalid={!!passErr}
              aria-describedby={passErr ? 'modal-pass-err' : undefined}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="btn rounded-xl px-3"
              onClick={()=>setShow(s=>!s)}
              aria-label={show ? t('login.hidePassword') : t('login.showPassword')}
              title={show ? t('login.hidePassword') : t('login.showPassword')}
            >
              {show ? (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 2l20 20M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-3.42M9.88 5.09A10.77 10.77 0 0112 5c7 0 10 7 10 7a17.11 17.11 0 01-3 4.37M6.61 6.61C3.67 8.39 2 12 2 12a17.22 17.22 0 003.11 4.45A13.34 13.34 0 0012 19a10.9 10.9 0 003.18-.47" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
              )}
            </button>
          </div>
          {passErr && <p id="modal-pass-err" className="text-xs text-red-600">{passErr}</p>}

          {formErr && <p className="text-sm text-red-600">{formErr}</p>}

          <button disabled={loading} className="btn-primary w-full rounded-xl py-2">
            {loading ? t('login.loggingIn') : t('login.login')}
          </button>

          <p className="text-xs muted">{t('login.demoHint')}</p>
        </form>
      </div>
    </div>
  );
}
