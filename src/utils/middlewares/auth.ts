import { NextRequest, NextResponse } from 'next/server';
import axios from '@/apis/axios';

export async function withoutAuth(req: NextRequest) {
  try {
    // const response = await validateUser(req)
    // if (response.status === 200) return NextResponse.redirect(url)
    // if (response.status === 401) return NextResponse.next()
    const res = await axios.get('users/me');
    console.log('유저 인증 성공');
    return NextResponse.redirect('/');
  } catch (error) {
    // console.log('err: ', error);
    // throw new Error(`Couldn't check authentication`);
    console.log(`Couldn't check authentication`);
  }
}
