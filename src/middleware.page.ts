import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withoutAuth } from './utils/middlewares/auth';

export async function middleware(request: NextRequest) {
  // 여기서 로그인 여부 확인 후 페이지에 따른 작업 처리

  if (request.nextUrl.pathname.startsWith('/login')) {
    console.log('로그인 페이지 진입');
    return withoutAuth(request);
  }
}

// config의 matcher에 등록된 url에 접속할 경우 middleware가 동작한다.
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
