import { cookies } from 'next/headers';

export async function GET() {
  try {
    const store = await cookies();
    const raw = store.get('session')?.value;
    if (!raw) return Response.json({ ok: false }, { status: 401 });
    const user = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'));
    return Response.json({ ok: true, user });
  } catch {
    return Response.json({ ok: false }, { status: 401 });
  }
}
