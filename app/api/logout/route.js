import { cookies } from 'next/headers';

export async function POST() {
  try {
    const store = await cookies();
    store.delete('session');
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
