export const getBytes = function (text: string) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  return bytes.length;
};
