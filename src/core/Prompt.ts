import { Command } from 'commander';

import pkg from '../../package.json' with { type: 'json' };
import { configurePluginsAction } from './actions/configurePluginsAction.js';
import { getActivePluginsAction } from './actions/getActivePlugins.action.js';
import { PluginManager } from './plugins/PluginManager.js';
import { Settings } from './Settings.js';

export class Prompt {
  readonly #pluginManager: PluginManager;
  readonly #settings: Settings;
  #program: Command;

  constructor(pluginManager: PluginManager, settings: Settings) {
    this.#pluginManager = pluginManager;
    this.#settings = settings;
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
      .action(getActivePluginsAction(this.#settings));

    pluginsCmd
      .command('config')
      .description('Activate/Deactivate plugins using an interactive selector')
      .action(configurePluginsAction(this.#settings));
  }

  private setupLoadedPluginsCommand() {
    const activePlugins = this.#settings.getActivePlugins();
    Object.entries(activePlugins).forEach(([groupKey, value]) => {
      const groupCommand = this.#program.command(groupKey).description(value.description);
      for (const plugin of value.plugins) {
        groupCommand
          .command(plugin.name)
          .description(plugin.description)
          .action(async (...args) => {
            try {
              await this.#pluginManager.executePlugin(groupKey, plugin.name, ...args);
            } catch (e) {
              console.error(`Error running plugin ${plugin.name}:`, e);
            }
          });
      }
    });
  }

  run() {
    this.#program.parse();
  }
}
