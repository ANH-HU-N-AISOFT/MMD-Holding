import { AxiosResponse } from 'axios';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UploadImage {
  file: File;
}

export interface ResponseSuccess {
  fieldname: 'file';
  originalname: 'Screenshot-0521-114146.png';
  encoding: '7bit';
  mimetype: 'image/png';
  destination: './uploads/consultations';
  filename: 'file-1716744085369-777935517.png';
  path: 'https://api.apispeed.online/uploads/consultations/file-1716744085369-777935517.png';
  size: 207678;
}

export const uploadImage = async ({ file }: UploadImage) => {
  const formData = new FormData();
  formData.append('file', file);
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'POST',
    url: '/consultation-forms/upload-image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
