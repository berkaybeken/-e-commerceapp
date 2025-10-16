import { api } from '../lib/api';

export async function listProducts(params) {
  const { data } = await api.get('/products', { params });
  return data;
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function searchProducts(q) {
  const { data } = await api.get('/products', { params: { q } });
  return data;
}

export async function createProduct(payload) {
  const { data } = await api.post('/products', payload);
  return data;
}

export async function updateProduct(id, patch) {
  const { data } = await api.patch(`/products/${id}`, patch);
  return data;
}
