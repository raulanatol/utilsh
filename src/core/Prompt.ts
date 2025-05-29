import search from '@inquirer/search';
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
    this.setupLoadedPluginsCommand();
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
      .command('activate')
      .description('Activate plugins using an interactive selector')
      .action(async () => {
        const available = this.#pluginManager.getAvailablePlugins();
        const active = this.#pluginManager.getActivePlugins();

        const choices = available.map(plugin => ({
          name: `${active.includes(plugin) ? '✓ ' : '  '}${plugin}`,
          value: plugin,
          description: active.includes(plugin) ? 'Active' : 'Inactive'
        }));

        const selected = await search({
          message: 'Select a plugin to toggle (type to filter):',
          source: async (input = '') => {
            const searchTerm = input.toLowerCase();
            return choices.filter(
              choice =>
                choice.name.toLowerCase().includes(searchTerm) || choice.value.toLowerCase().includes(searchTerm)
            );
          }
        });

        // Toggle the selected plugin state
        const isActive = active.includes(selected);
        if (isActive) {
          this.#pluginManager.removePlugin(selected);
        } else {
          this.#pluginManager.addPlugin(selected, { enabled: true });
        }

        console.log(`Plugin ${selected} ${isActive ? 'deactivated' : 'activated'} successfully.`);
      });

    pluginsCmd
      .command('remove <plugin>')
      .description('Remove a plugin from config')
      .action(plugin => {
        this.#pluginManager.removePlugin(plugin);
        console.log(`Plugin ${plugin} removed from config.`);
      });
  }

  private setupLoadedPluginsCommand() {
    const loadedPlugins = this.#pluginManager.getPlugins().values();
    for (const plugin of loadedPlugins) {
      this.#program
        .command(plugin.name)
        .description(plugin.description)
        .action(async (...args) => {
          try {
            await plugin.run(...args);
          } catch (e) {
            console.error(`Error running plugin ${plugin.name}:`, e);
          }
        });
    }
  }

  run() {
    this.#program.parse();
  }
}
