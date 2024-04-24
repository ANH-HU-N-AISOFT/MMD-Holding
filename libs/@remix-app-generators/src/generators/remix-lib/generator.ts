import { Tree, addProjectConfiguration, generateFiles, names, updateJson } from '@nx/devkit';
import { getRootTsConfigPath, getRootTsConfigPathInTree } from '@nx/js';
import { parse } from 'comment-json';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import * as path from 'path';
import { RemixLibGeneratorSchema } from './schema';
import { normalizeOptions } from './utils/normalize-options';

export const remixLibGenerator = async (tree: Tree, schema: RemixLibGeneratorSchema): Promise<void> => {
  const options = normalizeOptions(tree, schema);
  const resolvedOptions = {
    ...options,
    name: names(options.name).fileName,
  };
  if (resolvedOptions.name) {
    const projectRoot = `libs/${resolvedOptions.name}`;

    // Generate project.json
    addProjectConfiguration(tree, resolvedOptions.name, {
      tags: [],
      name: resolvedOptions.name,
      root: projectRoot,
      sourceRoot: `${projectRoot}/src`,
      projectType: 'library',
      targets: {
        lint: {
          executor: '@nx/linter:eslint',
          outputs: ['{options.outputFile}'],
          options: {
            lintFilePatterns: ['{projectRoot}/**/*.{ts,tsx,js,jsx}'],
            fix: true,
          },
        },
        typecheck: {
          executor: 'nx:run-commands',
          options: {
            cwd: '{projectRoot}',
            commands: ['tsc -p tsconfig.json --noEmit'],
          },
        },
      },
    });

    // Generate files
    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions);

    // Update tsconfig.base.json
    updateJson(tree, getRootTsConfigPathInTree(tree) as string, json => {
      if (options.projectName) {
        const paths_ = json?.compilerOptions?.paths;
        const paths = paths_ && typeof paths_ === 'object' ? paths_ : {};
        json.compilerOptions.paths = {
          ...paths,
          [options.projectName]: [`libs/${options.projectName}/src/index.ts`],
          [`${options.projectName}/server`]: [`libs/${options.projectName}/src/server.ts`],
        };
        return json;
      }
    });

    // Update all tsconfig.json of "apps"
    const baseTsConfig: any = parse(readFileSync(getRootTsConfigPath() as string, 'utf-8'));
    const pathsOfBaseTsConfig_ = baseTsConfig?.compilerOptions?.paths;
    const pathsOfBaseTsConfig =
      pathsOfBaseTsConfig_ && typeof pathsOfBaseTsConfig_ === 'object' ? pathsOfBaseTsConfig_ : {};

    const directoryOfAppsFolder = path.join(process.cwd(), 'apps');
    const directoryOfApps = readdirSync(directoryOfAppsFolder).reduce<string[]>((result, item) => {
      const directoryOfApp = `${directoryOfAppsFolder}/${item}`;
      if (statSync(directoryOfApp).isDirectory()) {
        result.push(directoryOfApp);
      }
      return result;
    }, []);
    directoryOfApps.forEach(folder => {
      try {
        const data = readFileSync(path.join(folder, 'tsconfig.json'), 'utf-8');
        const tsConfig: any = parse(data);
        const paths_ = tsConfig?.compilerOptions?.paths;
        const paths = paths_ && typeof paths_ === 'object' ? paths_ : {};
        tsConfig.compilerOptions.paths = {
          ...paths,
          ...Object.keys(pathsOfBaseTsConfig).reduce<Record<string, string[]>>((result, absolutePath) => {
            const mapping = pathsOfBaseTsConfig[absolutePath] as string[];
            return {
              ...result,
              [absolutePath]: mapping.map(item => `../../${item}`),
            };
          }, {}),
        };
        writeFileSync(path.join(folder, 'tsconfig.json'), JSON.stringify(tsConfig, undefined, 2));
      } catch {
        console.log(`"${folder}" can't parse. Please remove comment in tsconfig.json`);
      }
    });
  } else {
    throw new Error('App name must be provided');
  }
};

export default remixLibGenerator;
