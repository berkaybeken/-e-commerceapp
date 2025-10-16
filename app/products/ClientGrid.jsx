'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useI18n } from '../I18nProvider';
import { tCategory } from '../../lib/i18n-helpers';
import Heart from '../../components/Heart';

export default function ClientGrid({ products }) {
  const { t } = useI18n();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  const { add } = useCart();
  const { ids, toggle } = useWishlist();

  const rawCats = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );
  const categories = useMemo(() => ['all', ...rawCats], [rawCats]);

  const filtered = useMemo(() => {
    const base = cat === 'all' ? products : products.filter((p) => p.category === cat);
    const s = q.trim().toLowerCase();
    return s ? base.filter((p) => p.title.toLowerCase().includes(s)) : base;
  }, [products, q, cat]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <input
          className="input w-full sm:w-80"
          placeholder={t('common.search')}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="relative w-full sm:w-56">
          <select
            className="input appearance-none w-full h-12 sm:h-10 rounded-xl pl-4 pr-10 text-base sm:text-sm leading-none"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? t('common.all') : tCategory(t, c)}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-60"
            aria-hidden="true"
          >
            <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((p) => {
          const wished = ids.includes(p.id);
          return (
            <article key={p.id} className="card-skin overflow-hidden group flex flex-col min-w-0">
              <Link href={`/products/${p.id}`} className="block">
                <div className="relative aspect-square bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-contain p-4 sm:p-6 transition-transform duration-200 group-hover:scale-[1.03]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1536px) 33vw, 25vw"
                  />
                </div>
              </Link>

              <div className="p-3 flex-1 min-w-0">
                <Link href={`/products/${p.id}`} className="block">
                  <h3 className="font-medium line-clamp-2" title={p.title}>
                    {p.title}
                  </h3>
                </Link>
                <div className="mt-1 text-xs muted">{tCategory(t, p.category)}</div>
                <div className="mt-1 text-sm sm:text-base font-semibold">
                  {Number(p.price).toFixed(2)} ₺
                </div>
              </div>

              <div className="p-3 pt-0">
                <div className="grid grid-cols-[1fr_auto] gap-2 items-stretch min-w-0">
                  <button
                    onClick={() => add(p)}
                    className="btn-primary rounded-xl h-10 sm:h-11 px-3 text-xs sm:text-sm inline-flex items-center justify-center gap-2 w-full min-w-0"
                    aria-label={t('product.addToCart')}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 .001 4A2 2 0 0 0 17 18ZM6.2 6l.6 3h10.9a1 1 0 0 1 .98 1.2l-1 5a2 2 0 0 1-1.97 1.6H8.1a2 2 0 0 1-1.97-1.6L4.4 4H2V3h2.9a1 1 0 0 1 .98.82L6.2 6Z"
                      />
                    </svg>
                    <span className="truncate">{t('product.addToCart')}</span>
                  </button>

                  <button
                    onClick={() => toggle(p.id)}
                    className={`heart-btn w-10 h-10 sm:w-11 sm:h-11 ${wished ? 'active' : ''}`}
                    aria-pressed={wished}
                    aria-label={wished ? t('wishlist.added') : t('wishlist.add')}
                    title={wished ? t('wishlist.added') : t('wishlist.add')}
                  >
                    <Heart filled={wished} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="muted">{t('profile.none')}</div>}
    </div>
  );
}
