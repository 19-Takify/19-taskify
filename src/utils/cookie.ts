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
