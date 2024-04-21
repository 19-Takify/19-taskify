import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  console.log('middleware');

  const response = NextResponse.next();
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set(
    'Authorization',
    `bearer ${request.cookies.get('accessToken')?.value}`,
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};
