import Image from 'next/image';
import { notFound } from 'next/navigation';
import { api } from '../../../lib/api';
import { sleep } from '../../../lib/sleep';
import AddToCart from './AddToCart';

export default async function ProductDetail({ params }) {
  const { id } = await params;
  await sleep(300);

  const { data: p } = await api.get(`/products/${id}`).catch(() => ({ data: null }));
  if (!p?.id) notFound();

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
      <div className="card-skin overflow-hidden">
        <div className="relative aspect-square bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800">
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-contain p-6 sm:p-10"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">{p.title}</h1>
        <div className="text-sm">
          <span className="inline-block px-2 py-1 rounded-full border">{p.category}</span>
        </div>
        <p className="muted leading-relaxed">{p.description}</p>
        <div className="text-2xl font-bold">{Number(p.price).toFixed(2)} ₺</div>
        <div className="flex gap-3">
          <AddToCart product={p} />
        </div>
      </div>
    </main>
  );
}
