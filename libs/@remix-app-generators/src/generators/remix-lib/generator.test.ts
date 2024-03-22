import { Tree, readJson, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { remixLibGenerator } from './generator';
import { RemixLibGeneratorSchema } from './schema';

describe('remix-lib generator', () => {
  let tree: Tree;
  const options: RemixLibGeneratorSchema = {
    name: 'testing',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await remixLibGenerator(tree, options);

    const tsconfig = readJson(tree, 'tsconfig.base.json');
    expect(tsconfig.compilerOptions?.paths).toMatchObject({
      testing: ['libs/testing/src/index.ts'],
      'testing/server': ['libs/testing/src/server.ts'],
    });
    const config = readProjectConfiguration(tree, 'testing');
    expect(config).toBeDefined();
  });
});
