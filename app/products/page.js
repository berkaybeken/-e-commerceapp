import ClientGrid from './ClientGrid';
import { api } from '../../lib/api';

export default async function ProductsPage() {
  const { data: products } = await api.get('/products');
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <ClientGrid products={products} />
    </section>
  );
}
