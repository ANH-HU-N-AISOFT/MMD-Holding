import { getPublicEnv } from '../enviroment/getPublicEnv';

export const getResourceUrl = (filePath: string) => {
  return `${getPublicEnv('VITE_RESTFUL_API')}/${filePath}`;
};
