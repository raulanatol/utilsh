#!/usr/bin/env node

import { Command } from 'commander';
import { registerPlugins } from './plugins';

const program = new Command();

program
  .name('utilsh')
  .description('CLI tool with plugin system')
  .version('1.0.0');

// Registrar plugins
registerPlugins(program);

program.parse(); 