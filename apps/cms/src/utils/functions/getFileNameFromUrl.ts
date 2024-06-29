export const getFileNameFromUrl = (url: string) => {
  const segments = url.split('/');
  return segments.pop() || '';
};
