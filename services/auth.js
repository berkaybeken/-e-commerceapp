export async function login({ email, password }) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('LOGIN_FAILED');
  return res.json();
}

export async function logout() {
  await fetch('/api/logout', { method: 'POST' });
}

export async function getSession() {
  const res = await fetch('/api/session', { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.user || null;
}
