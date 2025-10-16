'use client';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ThemeToggle from './ThemeToggle';
import LangSwitcher from './LangSwitcher';
import { useI18n } from '../app/I18nProvider';

export default function Header() {
  const { items } = useCart();
  const { ids } = useWishlist();
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  const check = useCallback(async () => {
    try {
      const r = await fetch('/api/session', { cache: 'no-store' });
      setLoggedIn(r.ok);
    } catch {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    check();
    const onFocus = () => check();
    const onStorage = (e) => { if (e.key === 'auth') check(); };
    const onAuthChange = () => check();
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onStorage);
    window.addEventListener('auth-change', onAuthChange);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('auth-change', onAuthChange);
    };
  }, [check]);

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    localStorage.setItem('auth', String(Date.now()));
    window.dispatchEvent(new Event('auth-change'));
    setLoggedIn(false);
    router.push('/');
  };

  const cartCount = items.reduce((a, i) => a + i.quantity, 0);
  const wishCount = ids.length;

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 dark:bg-black/50 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 py-2">
          <nav
            className="
              order-2 lg:order-1 
              mt-2 lg:mt-0 
              -mx-3 px-3 lg:mx-0
              flex items-center gap-2 lg:flex-1 
              overflow-x-auto no-scrollbar
            "
            aria-label="Primary"
          >
            <Link href="/products" className="btn px-3 py-1.5 text-sm whitespace-nowrap">
              {t('common.products')}
            </Link>

            <Link href="/wishlist" className="btn px-3 py-1.5 text-sm whitespace-nowrap">
              {t('common.wishlist')}
              {wishCount > 0 && (
                <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full btn-solid">
                  {wishCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="btn px-3 py-1.5 text-sm whitespace-nowrap">
              {t('common.cart')}
              {cartCount > 0 && (
                <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full btn-solid">
                  {cartCount}
                </span>
              )}
            </Link>

            {loggedIn && (
              <Link href="/profile" className="btn px-3 py-1.5 text-sm whitespace-nowrap">
                {t('common.profile')}
              </Link>
            )}
          </nav>

          <div className="order-1 lg:order-2 flex items-center justify-between lg:justify-center">
            <Link
              href="/"
              className="text-base sm:text-lg lg:text-xl font-semibold shrink-0 py-1"
              aria-label="Homepage"
            >
              E-Shop
            </Link>
          </div>

          <div className="order-3 lg:order-3 mt-2 lg:mt-0 flex items-center gap-2 lg:ml-auto">
            <LangSwitcher />
            <ThemeToggle />
            {!loggedIn ? (
              <Link
                href="/login"
                className="btn-primary rounded-xl px-3 py-1.5 text-sm whitespace-nowrap"
              >
                {t('common.login')}
              </Link>
            ) : (
              <button
                onClick={logout}
                className="btn rounded-xl px-3 py-1.5 text-sm whitespace-nowrap"
              >
                {t('common.logout')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
