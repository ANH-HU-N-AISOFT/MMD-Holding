export const getPublicEnv = (key: keyof ImportMetaEnv) => {
  const value = import.meta.env[key];
  if (!value) {
    console.error(`"${key}" is not exist in env variables`);
  }
  return value;
};
