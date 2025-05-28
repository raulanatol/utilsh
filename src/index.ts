#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';

import { PluginManager } from './core/plugin-manager';

const program = new Command();
const pluginManager = new PluginManager();

program.name('utilsh').description('CLI tool with plugin system').version('1.0.0');

const pluginsCmd = program.command('plugins').description('Plugin management');

pluginsCmd
  .command('list')
  .description('List active plugins (in config)')
  .action(() => {
    const active = pluginManager.getActivePlugins();
    if (active.length === 0) {
      console.log('No active plugins.');
    } else {
      console.log('Active plugins:');
      active.forEach(p => console.log('  -', p));
    }
  });

pluginsCmd
  .command('available')
  .description('List installed plugins in node_modules')
  .action(() => {
    const available = pluginManager.getAvailablePlugins();
    if (available.length === 0) {
      console.log('No plugins installed.');
    } else {
      console.log('Installed plugins:');
      available.forEach(p => console.log('  -', p));
    }
  });

pluginsCmd
  .command('add <plugin> [settings]')
  .description('Add a plugin to config. You can pass settings as JSON or leave it empty for interactive mode.')
  .action(async (plugin, settings) => {
    let parsedSettings;
    if (settings) {
      try {
        parsedSettings = JSON.parse(settings);
        parsedSettings.enabled = true;
      } catch (e) {
        console.error('The settings parameter must be valid JSON.');
        process.exit(1);
      }
    } else {
      parsedSettings = { enabled: true };
      // Ask for extra settings
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'custom',
          message: 'Do you want to add any extra settings? (key:value, empty to skip)'
        }
      ]);
      if (answers.custom) {
        const [key, value] = answers.custom.split(':');
        if (key && value) {
          (parsedSettings as any)[key.trim()] = value.trim(); // eslint-disable-line @typescript-eslint/no-explicit-any
        }
      }
    }
    pluginManager.addPlugin(plugin, parsedSettings);
    console.log(`Plugin ${plugin} added and enabled.`);
  });

pluginsCmd
  .command('remove <plugin>')
  .description('Remove a plugin from config')
  .action(plugin => {
    pluginManager.removePlugin(plugin);
    console.log(`Plugin ${plugin} removed from config.`);
  });

// Register active plugins
pluginManager.loadPlugins(program).catch(console.error);

program.parse();
