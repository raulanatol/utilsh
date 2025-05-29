import { Command } from 'commander';
import inquirer from 'inquirer';

import pkg from '../../package.json' with { type: 'json' };
import { PluginManager } from './plugin-manager.js';

export class Prompt {
  #pluginManager: PluginManager;
  #program: Command;

  constructor(pluginManager: PluginManager) {
    this.#pluginManager = pluginManager;
    this.#program = new Command();
    this.#program.name('utilsh').description(pkg.description).version(pkg.version);
  }

  async setup() {
    this.setupPluginsCommand();
    await this.#pluginManager.loadPlugins(this.#program);
  }

  private setupPluginsCommand() {
    const pluginsCmd = this.#program.command('plugins').description('Plugin management');
    pluginsCmd
      .command('active')
      .description('List active plugins (in config)')
      .action(() => {
        const active = this.#pluginManager.getActivePlugins();
        if (active.length === 0) {
          console.log('No active plugins.');
        } else {
          console.log('Active plugins:');
          active.forEach(p => console.log('  -', p));
        }
      });

    pluginsCmd
      .command('available')
      .description('List installed plugins')
      .action(() => {
        const available = this.#pluginManager.getAvailablePlugins();
        available.forEach(plugin => {
          const metadata = this.#pluginManager.getMetadataFrom(plugin);
          console.log('- ', plugin, metadata ? `(${metadata.description})` : '');
        });
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
        this.#pluginManager.addPlugin(plugin, parsedSettings);
        console.log(`Plugin ${plugin} added and enabled.`);
      });

    pluginsCmd
      .command('remove <plugin>')
      .description('Remove a plugin from config')
      .action(plugin => {
        this.#pluginManager.removePlugin(plugin);
        console.log(`Plugin ${plugin} removed from config.`);
      });
  }

  run() {
    this.#program.parse();
  }
}
