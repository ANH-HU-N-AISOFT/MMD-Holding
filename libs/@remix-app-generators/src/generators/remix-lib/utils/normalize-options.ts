import { extractLayoutDirectory, names } from '@nx/devkit';
import { Tree } from '@nx/devkit';
import { getImportPath } from '@nx/js/src/utils/get-import-path';
import { RemixLibGeneratorSchema } from '../schema';
import { normalizeDirectory, normalizeProjectName } from './project';

export interface RemixLibraryOptions extends RemixLibGeneratorSchema {
  projectName: string;
  importPath: string;
}

export const normalizeOptions = (tree: Tree, options: RemixLibGeneratorSchema): RemixLibraryOptions => {
  const directory = 'libs';
  const name = names(options.name).fileName;

  const { projectDirectory } = extractLayoutDirectory(directory);
  const fullProjectDirectory = normalizeDirectory(name, projectDirectory);
  const importPath = getImportPath(tree, fullProjectDirectory);
  const projectName = normalizeProjectName(name, projectDirectory);

  return {
    ...options,
    name,
    importPath,
    projectName,
  };
};
