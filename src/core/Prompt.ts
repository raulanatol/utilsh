import { Command } from 'commander';

import pkg from '../../package.json' with { type: 'json' };
import { activatePluginAction } from './actions/activatePlugin.action.js';
import { addPluginAction } from './actions/addPlugin.action.js';
import { getActivePluginsAction } from './actions/getActivePlugins.action.js';
import { getAvailablePluginsAction } from './actions/getAvailablePlugins.action.js';
import { removePluginAction } from './actions/removePlugin.action.js';
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
      .action(getActivePluginsAction(this.#pluginManager));

    pluginsCmd
      .command('available')
      .description('List installed plugins')
      .action(getAvailablePluginsAction(this.#pluginManager));

    pluginsCmd
      .command('add <plugin> [settings]')
      .description('Add a plugin to config. You can pass settings as JSON or leave it empty for interactive mode.')
      .action(addPluginAction(this.#pluginManager));

    pluginsCmd
      .command('activate')
      .description('Activate plugins using an interactive selector')
      .action(activatePluginAction(this.#pluginManager));

    pluginsCmd
      .command('remove <plugin>')
      .description('Remove a plugin from config')
      .action(removePluginAction(this.#pluginManager));
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
