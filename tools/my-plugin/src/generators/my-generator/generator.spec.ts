import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { testLibGenerator } from './generator';
import { MyGeneratorGeneratorSchema } from './schema';

jest.mock('prettier', () => null);

describe('my-generator generator', () => {
  let tree: Tree;
  const options: MyGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await testLibGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
