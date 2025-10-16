import { api } from '../../../../lib/api';
import { cookies } from 'next/headers';

export async function PATCH(req, { params }) {
  try {
    const store = await cookies();
    if (!store.get('session')?.value) return Response.json({ ok: false }, { status: 401 });

    const body = await req.json();
    const { data } = await api.patch(`/orders/${params.id}`, body);
    return Response.json(data);
  } catch {
    return Response.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
