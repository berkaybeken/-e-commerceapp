import { cookies } from 'next/headers';
import { api } from '../../../lib/api';

export async function POST(req) {
  try {
    const store = await cookies();
    const raw = store.get('session')?.value;
    if (!raw) return Response.json({ ok: false }, { status: 401 });

    const user = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'));
    const { items, total, status = 'paid' } = await req.json();
    if (!Array.isArray(items) || !Number.isFinite(Number(total))) {
      return Response.json({ ok: false, error: 'BAD_REQUEST' }, { status: 400 });
    }

    const order = {
      userId: user.id,
      date: new Date().toISOString(),
      items,
      total: Number(total),
      status,
    };

    const { data } = await api.post('/orders', order);
    return Response.json(data, { status: 201 });
  } catch {
    return Response.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
