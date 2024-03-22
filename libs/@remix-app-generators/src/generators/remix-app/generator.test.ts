import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { remixAppGenerator } from './generator';
import { RemixAppGeneratorSchema } from './schema';

describe('remix-app generator', () => {
  let tree: Tree;
  const options: RemixAppGeneratorSchema = {
    name: 'testing',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await remixAppGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'testing');
    expect(config).toBeDefined();
  });
});
