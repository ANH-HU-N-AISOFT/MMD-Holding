import { names } from '@nx/devkit';

export const normalizeDirectory = (appName: string, directoryName: string): string => {
  return directoryName ? `${names(directoryName).fileName}/${names(appName).fileName}` : names(appName).fileName;
};

export const normalizeProjectName = (appName: string, directoryName: string): string => {
  return normalizeDirectory(appName, directoryName).replace(/\//g, '-');
};
