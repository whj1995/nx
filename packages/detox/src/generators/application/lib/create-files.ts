import {
  detectPackageManager,
  generateFiles,
  getPackageManagerCommand,
  offsetFromRoot,
  toJS,
  Tree,
} from '@nrwl/devkit';
import { getRelativePathToRootTsConfig } from '@nrwl/workspace/src/utilities/typescript';
import { join } from 'path';
import { NormalizedSchema } from './normalize-options';

export function createFiles(host: Tree, options: NormalizedSchema) {
  generateFiles(host, join(__dirname, '../files/app'), options.projectRoot, {
    ...options,
    exec: getPackageManagerCommand(detectPackageManager(host.root)).exec,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    rootTsConfigPath: getRelativePathToRootTsConfig(host, options.projectRoot),
  });
  if (options.js) {
    toJS(host);
  }
}
