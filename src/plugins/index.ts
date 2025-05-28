import { Command } from 'commander';
import { helpPlugin } from './help';
import { helloPlugin } from './hello';

const plugins = [helpPlugin, helloPlugin];

export function registerPlugins(program: Command): void {
  plugins.forEach((plugin) => plugin(program));
}
