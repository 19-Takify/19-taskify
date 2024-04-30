//날짜를 2024-04-26T13:57:54.131Z 에서 2024-04-26 13:57 로 바꿔주는 커스텀 훅 입니당!

export const isDateFormat = (date: string | undefined) => {
  if (!date) return '';
  const fommatDate = date
    .slice(0, date.indexOf('.'))
    .replace('T', ' ')
    .slice(0, -3);

  return fommatDate;
};
