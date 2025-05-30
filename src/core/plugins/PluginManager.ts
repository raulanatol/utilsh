import { join } from 'node:path';

import { Settings } from '../Settings.js';
import { Plugin } from './Plugin.js';

export class PluginManager {
  readonly #settings: Settings;

  constructor(settings: Settings) {
    this.#settings = settings;
  }

  private async loadPlugin(pluginName: string, groupName = ''): Promise<Plugin | undefined> {
    try {
      const plugin = await import(join(this.#settings.pluginsDir, groupName, pluginName, `${pluginName}.plugin.js`));
      return new plugin.default();
    } catch (error) {
      console.error(`Error loading plugin ${pluginName}:`, error);
    }
    return undefined;
  }

  async executePlugin(groupName: string, pluginName: string, ...options: string[]) {
    const pluginInstance = await this.loadPlugin(pluginName, groupName);
    await pluginInstance?.run(options);
  }
}
