import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_TOKEN_COOKIE_NAME } from './constants/auth';
import { getMeForMiddleware } from './utils/auth';
import { PAGE_PATH } from './constants/pageUrl';

// 로그인하지 않은 유저만 접근할 수 있는 URL 정규식
const guestOnlyUrlRegex = /^(\/$|\/signup|\/login)/;
// 로그인한 유저만 접근할 수 있는 URL 정규식
const userOnlyUrlRegex = /^(\/mypage|\/dashboard|\/mydashboard)/;

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const accessToken = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const isLogin = await getMeForMiddleware(accessToken);

  // 로그인한 유저가 로그인하지 않은 유저만 접근할 수 있는 페이지에 접근했을 때 '내 대시보드' 페이지로 redirect 시킵니다.
  if (isLogin && guestOnlyUrlRegex.test(pathName)) {
    return NextResponse.redirect(new URL(PAGE_PATH.MY_DASHBOARD, request.url));
  }

  // 로그인하지 않은 유저가 로그인한 유저만 접근할 수 있는 페이지에 접근했을 때 '로그인' 페이지로 redirect 시킵니다.
  if (!isLogin && userOnlyUrlRegex.test(pathName)) {
    return NextResponse.redirect(new URL(PAGE_PATH.LOGIN, request.url));
  }
}

// matcher에 포함된 URL 주소만 middleware가 동작합니다.
// 아래는 API routes를 포함해서 정적인 파일들을 제외한 모든 경로에 대해서 middleware를 동작하는 정규식입니다.
export const config = {
  matcher: ['/((?!api|images|svgs|_next/static|_next/image|favicon.ico).*)'],
};
