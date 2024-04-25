import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_TOKEN_COOKIE_NAME } from './constants/auth';
import { getMeForMiddleware } from './utils/auth';

const guestOnlyUrlRegex = /^(\/$|\/signup|\/login)/;
const userOnlyUrlRegex = /^(\/mypage|\/dashboard|\/mydashboard)/;

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const accessToken = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const isLogin = await getMeForMiddleware(accessToken);

  if (isLogin && guestOnlyUrlRegex.test(pathName)) {
    return NextResponse.redirect(new URL('/mydashboard', request.url));
  }

  if (!isLogin && userOnlyUrlRegex.test(pathName)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|images|svgs|_next/static|_next/image|favicon.ico).*)'],
};
