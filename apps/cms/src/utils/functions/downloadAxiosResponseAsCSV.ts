import { AxiosResponse } from 'axios';

interface DownloadAxiosResponseAsCSV {
  response: AxiosResponse['data'];
  fileName: string;
}

export const downloadAxiosResponseAsCSV = ({ fileName, response }: DownloadAxiosResponseAsCSV) => {
  // create file link in browser's memory
  const href = URL.createObjectURL(response as Blob);

  // create "a" HTML element with href to file & click
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', `${fileName}.csv`); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);

  return null;
};
