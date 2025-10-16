import { redirect } from 'next/navigation';
import { api } from '../../lib/api';
import { getSession } from '../../lib/session';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const user = await getSession();
  if (!user) redirect('/login?next=/profile');

  const { data } = await api.get('/orders', {
    params: { userId: user.id, _sort: 'date', _order: 'desc' },
  });
  const orders = Array.isArray(data)
    ? [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return <ProfileClient orders={orders} user={user} />;
}
