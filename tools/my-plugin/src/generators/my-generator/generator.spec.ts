import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { testLibGenerator } from './generator';
import { MyGeneratorGeneratorSchema } from './schema';

jest.mock('prettier', () => null);

describe('my-generator generator', () => {
  let tree: Tree;
  const options: MyGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

  beforeEach(() => {
    jest.doMock('@nx/devkit', () => ({
      ...jest.requireActual('@nx/devkit'),
      createProjectGraphAsync: jest.fn().mockImplementation(async () => ({
        nodes: {},
        dependencies: {},
      })),
    }));
  });

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await testLibGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });

  afterEach(() => {
    jest.resetModules();
  });
});
