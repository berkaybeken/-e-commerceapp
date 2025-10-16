'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import LoginInline from './LoginInline';
import { useI18n } from '../I18nProvider';

export default function CartPage() {
  const { t } = useI18n();
  const { items, setQty, remove, total } = useCart();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const minus = (id, q) => setQty(id, Math.max(1, q - 1));
  const plus = (id, q) => setQty(id, q + 1);

  async function proceed() {
    const res = await fetch('/api/session', { cache: 'no-store' });
    if (!res.ok) { setShowLogin(true); return; }
    setConfirmOpen(true);
  }

  async function confirmPurchase() {
    setConfirmOpen(false);
    router.push('/profile?checkout=1');
  }

  return (
    <main className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold">{t('cart.title')}</h1>

      {items.length === 0 && <div className="muted">{t('cart.empty')}</div>}

      {items.map((i) => (
        <div key={i.id} className="card-skin p-3 sm:p-4 flex flex-col gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="relative w-16 h-16 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shrink-0">
              <Image src={i.image} alt={i.title} fill className="object-contain p-2" sizes="64px" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm sm:text-base font-medium line-clamp-2" title={i.title}>{i.title}</div>
              <div className="text-xs muted">{Number(i.price).toFixed(2)} ₺</div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button className="qty-btn h-9 w-9" onClick={() => minus(i.id, i.quantity)} disabled={i.quantity <= 1}>−</button>
              <span className="qty-num text-sm w-6 text-center">{i.quantity}</span>
              <button className="qty-btn h-9 w-9" onClick={() => plus(i.id, i.quantity)}>+</button>
            </div>

            <div className="hidden sm:block w-24 text-right font-medium whitespace-nowrap">
              {(i.price * i.quantity).toFixed(2)} ₺
            </div>
          </div>

          <div className="sm:hidden flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="qty-btn h-10 w-10" onClick={() => minus(i.id, i.quantity)} disabled={i.quantity <= 1}>−</button>
              <span className="qty-num text-base w-8 text-center">{i.quantity}</span>
              <button className="qty-btn h-10 w-10" onClick={() => plus(i.id, i.quantity)}>+</button>
            </div>
            <div className="text-base font-medium whitespace-nowrap">{(i.price * i.quantity).toFixed(2)} ₺</div>
          </div>

          <div className="flex justify-end">
            <button onClick={() => remove(i.id)} className="btn btn-sm">{t('cart.remove')}</button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="card-skin p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-lg">
            {t('common.total')}: <span className="font-bold whitespace-nowrap">{total.toFixed(2)} ₺</span>
          </div>
          <button onClick={proceed} className="btn-primary rounded-xl px-5 py-2 w-full sm:w-auto">
            {t('cart.proceed')}
          </button>
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl card-skin p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">{t('cart.confirmTitle')}</h3>
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">{t('common.total')}</div>
              <div className="text-lg font-bold">{total.toFixed(2)} ₺</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setConfirmOpen(false)} className="btn flex-1">{t('common.cancel')}</button>
              <button onClick={confirmPurchase} className="btn-primary rounded-xl px-4 py-2 flex-1">
                {t('cart.buy')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <LoginInline
          onSuccess={() => { setShowLogin(false); setConfirmOpen(true); }}
          onClose={() => setShowLogin(false)}
        />
      )}
    </main>
  );
}
