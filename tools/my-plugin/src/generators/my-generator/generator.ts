import {
  formatFiles,
  Tree,
} from '@nx/devkit';
import { MyGeneratorGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';

export async function testLibGenerator(
  tree: Tree,
  options: MyGeneratorGeneratorSchema
) {

  await libraryGenerator(tree, {
    name: options.name,
    directory: `libs/${options.name}`,
    projectNameAndRootFormat: 'as-provided',
  })
  await formatFiles(tree);
}

export default testLibGenerator;
