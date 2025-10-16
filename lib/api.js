import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  timeout: 10000,
  withCredentials: false,
});

api.interceptors.request.use((config) => config);

api.interceptors.response.use(
  (r) => r,
  (e) => {
    console.error('[API]', e?.response?.status, e?.message);
    return Promise.reject(e);
  }
);

export const money = (n) => `${Number(n).toFixed(2)} ₺`;
