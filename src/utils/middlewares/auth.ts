import { NextRequest, NextResponse } from 'next/server';
import axios from '@/apis/axios';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/api';

export async function withoutAuth(req: NextRequest) {
  const accessToken = req.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  console.log('middleware accessToken: ', accessToken);

  try {
    // const response = await validateUser(req)
    // if (response.status === 200) return NextResponse.redirect(url)
    // if (response.status === 401) return NextResponse.next()
    await fetch('https://sp-taskify-api.vercel.app/4-19/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('유저 인증 성공');
    console.log('req.url: ', req.url);
    const nextUrl = req.url;
    // const nextUrl = req.nextUrl.origin;
    console.log(new URL('/', nextUrl).href);

    // return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    console.log('err: ', error);
    // throw new Error(`Couldn't check authentication`);
    console.log(`Couldn't check authentication`);
  }
}
