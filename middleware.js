import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const session = req.cookies.get('session')?.value;

  const isProtectedPage =
    url.pathname.startsWith('/profile') ||
    url.pathname.startsWith('/wishlist');

  const isProtectedApi = url.pathname.startsWith('/api/orders');

  if ((isProtectedPage || isProtectedApi) && !session) {
    if (isProtectedPage) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('next', url.pathname + (url.search || ''));
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/wishlist/:path*', '/api/orders/:path*'],
};
