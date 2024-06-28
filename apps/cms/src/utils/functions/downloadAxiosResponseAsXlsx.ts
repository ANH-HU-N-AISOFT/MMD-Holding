import { AxiosResponse } from 'axios';

interface DownloadAxiosResponseAsXlsx {
  response: AxiosResponse['data'];
  fileName: string;
}

export const downloadAxiosResponseAsXlsx = ({ fileName, response }: DownloadAxiosResponseAsXlsx) => {
  // create file link in browser's memory
  const href = URL.createObjectURL(response as Blob);

  // create "a" HTML element with href to file & click
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', `${fileName}.xlsx`); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);

  return null;
};
