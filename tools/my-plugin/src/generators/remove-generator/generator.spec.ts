import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration, FileChange } from '@nx/devkit';

import { testRemoveGenerator } from './generator';
import { RemoveGeneratorGeneratorSchema } from './schema';
import testLibGenerator from '../my-generator/generator';

jest.mock('prettier', () => null);

describe('remove-generator generator', () => {
  let tree: Tree;
  const options: RemoveGeneratorGeneratorSchema = { name: 'test' };

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

    console.log(tree.listChanges());

    expect(readProjectConfiguration(tree, 'test')).toBeTruthy();

    let libraryFiles: FileChange[] = tree
      .listChanges()
      .filter(
        (file: FileChange) =>
          file.path.startsWith('libs/test') && file.type === 'CREATE'
      );

    expect(libraryFiles.length).toBe(13);

    tree.delete('tsconfig.base.json');

    await testRemoveGenerator(tree, options);

    libraryFiles = tree
      .listChanges()
      .filter(
        (file: FileChange) =>
          file.path.startsWith('libs/test') && file.type === 'CREATE'
      );

    expect(libraryFiles.length).toBe(0);
  });
});
