'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '../lib/api';
import { useI18n } from './I18nProvider';

export default function Home() {
  const { t } = useI18n();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    api
      .get('/products', { params: { _limit: 4, _sort: 'id', _order: 'asc' } })
      .then(({ data }) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  const loading = products === null;
  const empty = products && products.length === 0;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl card-skin p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('home.welcomeTitle')}</h1>
        <p className="mt-2 text-base md:text-lg muted">{t('home.welcomeDesc')}</p>
        <div className="mt-6 flex gap-3">
          <Link href="/products" className="btn">{t('home.goProducts')}</Link>
          <Link href="/login" className="btn">{t('home.login')}</Link>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">{t('home.featured')}</h2>

        {(loading || empty) ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl card-skin overflow-hidden">
                <div className="aspect-square bg-gray-100 dark:bg-zinc-900 animate-pulse" />
                <div className="p-3">
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
                  <div className="h-3 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <div key={p.id} className="card-skin group overflow-hidden">
                <Link href={`/products/${p.id}`} className="block">
                  <div className="relative aspect-square bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-contain p-6 transition-transform duration-200 group-hover:scale-[1.04]"
                      sizes="(max-width:768px) 50vw, 25vw"
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/products/${p.id}`} className="block">
                    <h3 className="font-medium line-clamp-2" title={p.title}>{p.title}</h3>
                  </Link>
                  <div className="mt-1 font-semibold">{Number(p.price).toFixed(2)} ₺</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
