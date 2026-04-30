import { NextResponse } from 'next/server';

import { auth } from '@/shared/auth/config';

const PUBLIC_AUTH_PATHS = new Set<string>(['/', '/login', '/verify']);

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth?.user);

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (isLoggedIn && PUBLIC_AUTH_PATHS.has(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  if (!isLoggedIn && !PUBLIC_AUTH_PATHS.has(pathname)) {
    const loginUrl = new URL('/login', req.nextUrl);
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
