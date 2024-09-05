import {
  formatFiles,
  Tree,
} from '@nx/devkit';
import { RemoveGeneratorGeneratorSchema } from './schema';
import { removeGenerator } from '@nx/workspace';

export async function testRemoveGenerator(
  tree: Tree,
  options: RemoveGeneratorGeneratorSchema
) {

  await removeGenerator(tree, {
    projectName: options.name,
    forceRemove: false,
    skipFormat: false
  })
  await formatFiles(tree);
}

export default testRemoveGenerator;
