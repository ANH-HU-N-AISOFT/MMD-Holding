export const getFileNameFromUrl = (url: string) => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const segments = pathname.split('/');
  return segments.pop() || '';
};
