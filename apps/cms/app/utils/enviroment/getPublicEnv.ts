import { isBrowser } from 'utilities';

export const getPublicEnv = (key: keyof NodeJS.ProcessEnv) => {
  const value = isBrowser() ? window.ENV?.[key] : process.env[key];
  if (!value) {
    console.error(`"${key}" is not exist in env variables`);
  }
  return value;
};
