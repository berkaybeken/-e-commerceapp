'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { api } from '../../lib/api';
import { useI18n } from '../I18nProvider';

export default function ProfileClient({ orders: initialOrders, user }) {
  const router = useRouter();
  const sp = useSearchParams();
  const { items, total, clear } = useCart();
  const { t, lang } = useI18n();

  const [orders, setOrders] = useState(initialOrders || []);
  const [success, setSuccess] = useState(sp.get('success') === '1');
  const ordersSectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sp.get('success') === '1') return;
    if (sessionStorage.getItem('order-success') === '1') {
      sessionStorage.removeItem('order-success');
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [sp]);

  const refreshOrders = useCallback(async () => {
    if (!user?.id) return;
    const { data } = await api.get('/orders', {
      params: { userId: user.id, _sort: 'date', _order: 'desc', _: Date.now() },
    });
    const sorted = Array.isArray(data)
      ? [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];
    setOrders(sorted);
  }, [user?.id]);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const runningRef = useRef(false);

  useEffect(() => {
    const fromCheckout = sp.get('checkout') === '1';
    (async () => {
      if (!fromCheckout || runningRef.current) return;
      runningRef.current = true;

      const snapshotItems = Array.isArray(items) ? items : [];
      const snapshotTotal = Number(total || 0);
      if (snapshotItems.length === 0) {
        router.replace('/profile');
        runningRef.current = false;
        return;
      }

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: snapshotItems,
            total: Number(snapshotTotal.toFixed(2)),
            status: 'paid',
          }),
        });
        if (!res.ok) throw new Error();

        clear();
        await refreshOrders();
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('order-success', '1');
        }
        router.replace('/profile?success=1');
      } catch {
        router.replace('/profile');
      } finally {
        runningRef.current = false;
      }
    })();
  }, [sp, items, total, router, clear, refreshOrders]);

  const latest = orders?.[0];
  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';

  return (
    <main className="p-2 sm:p-4 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('common.profile')}</h1>
          <div className="text-sm muted">{t('profile.hello', { email: user?.email })}</div>
        </div>
        <button
          onClick={async () => {
            await fetch('/api/logout', { method: 'POST' });
            localStorage.setItem('auth', String(Date.now()));
            window.dispatchEvent(new Event('auth-change'));
            router.push('/');
          }}
          className="btn"
          title={t('common.logout')}
        >
          {t('common.logout')}
        </button>
      </div>

      {success && latest && (
        <section aria-live="polite" className="rounded-2xl p-4 card-skin space-y-3">
          <div className="text-green-600 dark:text-green-300 font-medium">✅ {t('profile.successTitle')}</div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {latest.items?.slice(0, 12).map((it, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  className="object-contain p-2 bg-white dark:bg-zinc-900"
                  sizes="80px"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="opacity-70">{t('profile.total')}:</span>{' '}
              <span className="font-semibold">{Number(latest.total).toFixed(2)} ₺</span>
            </div>
            <div className="opacity-80">
              {t('profile.status')}: {latest.status === 'paid' ? t('profile.paid') : latest.status}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/products" className="btn">{t('common.continueShopping')}</Link>
            <button
              type="button"
              className="btn"
              onClick={() => ordersSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {t('profile.orders')}
            </button>
          </div>
        </section>
      )}

      <section ref={ordersSectionRef} className="space-y-3">
        <h2 className="text-xl font-semibold">{t('profile.orders')}</h2>
        {orders?.length === 0 && <div className="muted">{t('profile.none')}</div>}

        <div className="space-y-4">
          {orders?.map((o) => (
            <div key={o.id} className="rounded-xl p-4 card-skin">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm muted">{new Date(o.date).toLocaleString(locale)}</div>
                <div className="text-sm">
                  {t('profile.status')}: <span className="font-medium">{o.status === 'paid' ? t('profile.paid') : o.status}</span>
                </div>
              </div>
              <div className="mt-2 font-semibold">
                {t('profile.total')}: {Number(o.total).toFixed(2)} ₺
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {o.items?.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg border p-2">
                    <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
                      <Image src={it.image} alt={it.title} fill className="object-contain p-1.5" sizes="64px" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium line-clamp-2">{it.title}</div>
                      <div className="text-xs muted">
                        {(it.quantity ?? 1)} × {Number(it.price).toFixed(2)} ₺
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
