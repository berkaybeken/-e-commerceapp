'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '../../lib/api';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../I18nProvider';

function CartIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 .001 4A2 2 0 0 0 17 18ZM6.2 6l.6 3h10.9a1 1 0 0 1 .98 1.2l-1 5a2 2 0 0 1-1.97 1.6H8.1a2 2 0 0 1-1.97-1.6L4.4 4H2V3h2.9a1 1 0 0 1 .98.82L6.2 6Z"/>
    </svg>
  );
}

export default function WishlistPage() {
  const { t } = useI18n();
  const { ids, remove, clear } = useWishlist();
  const { add } = useCart();
  const [all, setAll] = useState([]);

  useEffect(() => {
    api.get('/products').then(r => setAll(r.data)).catch(() => setAll([]));
  }, []);

  const products = useMemo(() => all.filter(p => ids.includes(p.id)), [all, ids]);

  return (
    <main className="px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">{t('wishlist.title')}</h1>
        {ids.length > 0 && (
          <button onClick={clear} className="btn btn-xs">{t('common.clearAll')}</button>
        )}
      </div>

      {products.length === 0 && <div className="muted">{t('wishlist.empty')}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {products.map((p) => (
          <div key={p.id} className="card-skin overflow-hidden group flex flex-col min-w-0">
            <Link href={`/products/${p.id}`} className="block">
              <div className="relative aspect-square bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-contain p-4 sm:p-6 transition-transform duration-200 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1536px) 33vw, 20vw"
                />
              </div>
            </Link>

            <div className="p-3 flex-1 min-w-0">
              <Link href={`/products/${p.id}`} className="block">
                <h3 className="font-medium line-clamp-2" title={p.title}>{p.title}</h3>
              </Link>
              <div className="mt-1 text-sm sm:text-base font-semibold">{Number(p.price).toFixed(2)} ₺</div>
            </div>

            <div className="p-3 pt-0">
              <div className="grid grid-cols-[1fr_auto] gap-2 items-stretch min-w-0">
                <button
                  onClick={() => add(p)}
                  className="btn-primary rounded-xl h-10 sm:h-11 px-3 text-xs sm:text-sm inline-flex items-center justify-center gap-2 w-full min-w-0"
                  aria-label={t('product.addToCart')}
                  title={t('product.addToCart')}
                >
                  <CartIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t('product.addToCart')}</span>
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="btn rounded-xl h-10 sm:h-11 px-3 text-xs sm:text-sm whitespace-nowrap"
                >
                  {t('wishlist.remove')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
