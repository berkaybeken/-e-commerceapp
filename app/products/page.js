import ClientGrid from './ClientGrid';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

const BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://fakestoreapi.com').replace(/\/$/, '');

async function getProducts() {
  try {
    const r = await fetch(`${BASE}/products`, { cache: 'no-store' });
    if (!r.ok) return [];
    return await r.json();
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <ClientGrid products={products} />
    </section>
  );
}
