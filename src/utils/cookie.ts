import { isBrowser } from './constants';

/**
 * @todo 고도화 예정
 * @param cookieName - cookie로 사용할 이름
 * @param value - cookie로 사용할 값
 */
export const setCookie = (cookieName: string, value: string) => {
  const encodedCookieName = encodeURIComponent(cookieName);
  const encodedValue = encodeURIComponent(value);
  const cookie = `${encodedCookieName}=${encodedValue}`;
  document.cookie = cookie;
};

export const getCookie = (cookieName: string) => {
  if (isBrowser) {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`))
      ?.split('=')[1];
    return cookie ? decodeURIComponent(cookie) : null;
  }

  return null;
};

export const deleteCookie = (cookieName: string) => {
  if (isBrowser) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
