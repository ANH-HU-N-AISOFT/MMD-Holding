import { addProjectConfiguration, generateFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import { RemixAppGeneratorSchema } from './schema';

export const remixAppGenerator = async (tree: Tree, options: RemixAppGeneratorSchema): Promise<void> => {
  const resolvedOptions = {
    ...options,
    name: names(options.name).fileName,
  };
  if (resolvedOptions.name) {
    const projectRoot = `apps/${resolvedOptions.name}`;

    // Generate project.json
    addProjectConfiguration(tree, resolvedOptions.name, {
      root: projectRoot,
      projectType: 'application',
      sourceRoot: `${projectRoot}/src`,
      tags: [],
      name: resolvedOptions.name,
      targets: {
        build: {
          command: 'remix build',
          options: {
            cwd: '{projectRoot}',
            postcssConfig: '{projectRoot}/postcss.config.js',
          },
        },
        start: {
          dependsOn: ['build'],
          command: 'remix-serve ./build/index.js',
          options: {
            cwd: '{projectRoot}',
          },
        },
        dev: {
          command: 'remix dev --manual',
          options: {
            cwd: '{projectRoot}',
          },
        },
        lint: {
          executor: '@nx/linter:eslint',
          outputs: ['{options.outputFile}'],
          options: {
            lintFilePatterns: ['{projectRoot}/**/*.{js,ts,jsx,tsx}'],
            fix: true,
            ignorePath: '{workspaceRoot}/.eslintignore',
          },
        },
        typecheck: {
          executor: 'nx:run-commands',
          options: {
            cwd: '{projectRoot}',
            commands: ['tsc -p tsconfig.json --noEmit'],
          },
        },
        stylelint: {
          executor: 'nx-stylelint:lint',
          outputs: ['{options.outputFile}'],
          options: {
            lintFilePatterns: ['{projectRoot}/**/*.css'],
            fix: true,
            formatter: 'compact',
          },
        },
      },
    });

    // Generate files
    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions);
  } else {
    throw new Error('App name must be provided');
  }
};

export default remixAppGenerator;
