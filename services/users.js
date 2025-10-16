import { api } from '../lib/api';

export async function listUsers(params) {
  const { data } = await api.get('/users', { params });
  return data;
}

export async function getUser(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

export async function findUserByEmail(email) {
  const { data } = await api.get('/users', { params: { email } });
  return Array.isArray(data) && data.length ? data[0] : null;
}

export async function createUser(payload) {
  const { data } = await api.post('/users', payload);
  return data;
}

export async function updateUser(id, patch) {
  const { data } = await api.patch(`/users/${id}`, patch);
  return data;
}
