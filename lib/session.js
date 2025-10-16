import { cookies } from 'next/headers';

export async function getSession() {
  const store = await cookies();
  const raw = store.get('session')?.value;
  if (!raw) return null;
  try {
    const user = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'));
    return user;
  } catch {
    return null;
  }
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
