import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withoutAuth } from './utils/middlewares/auth';

export function middleware(request: NextRequest) {
  console.log('request: ', request);

  if (request.nextUrl.pathname.startsWith('/login')) {
    // return NextResponse.rewrite(new URL('/singup', request.url));
    console.log('로그인 페이지 진입');

    return withoutAuth(request);
  }
}

export const config = {
  matcher: [
    /*
     * 다음과 같이 시작하는 경로를 제외한 모든 요청 경로와 일치:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
