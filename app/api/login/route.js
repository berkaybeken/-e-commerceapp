import { cookies } from 'next/headers';
import { api } from '../../../lib/api';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const q = { email: String(email || '').trim().toLowerCase(), password };
    const { data: users } = await api.get('/users', { params: q });
    const user = users?.[0];
    if (!user) return Response.json({ ok: false, error: 'UNAUTHORIZED' }, { status: 401 });

    const store = await cookies();
    const payload = { id: user.id, email: user.email };
    const value = Buffer.from(JSON.stringify(payload)).toString('base64');

    store.set('session', value, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === 'production',
    });

    return Response.json({ ok: true, user: payload });
  } catch {
    return Response.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
