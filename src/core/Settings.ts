import os from 'node:os';
import path from 'node:path';

import { PluginConfiguration } from '../plugins/PluginConfiguration.js';
import { FileSystemHelper } from './helpers/FileSystemHelper.js';
import { PluginsConfiguration } from './plugins/PluginsConfiguration.js';

const getDefaultConfig = () => ({
  version: 1,
  plugins: {}
});

type PluginSettings = {
  enabled: boolean;
  [key: string]: unknown;
};

type Configuration = {
  plugins: {
    [pluginName: string]: PluginSettings;
  };
};

export class Settings {
  readonly #configDir: string;
  readonly #configPath: string;
  readonly #pluginsDir: string;
  readonly #configuration: Configuration;
  readonly #pluginsConfiguration: PluginsConfiguration;

  constructor() {
    this.#configDir = path.join(os.homedir(), '.config', 'utilsh');
    this.#configPath = path.join(this.#configDir, 'config.json');
    this.#pluginsDir = path.join(process.cwd(), 'src', 'plugins');
    this.#configuration = this.loadOrCreateConfig();
    this.#pluginsConfiguration = PluginConfiguration;
  }

  private loadOrCreateConfig(): Configuration {
    if (!FileSystemHelper.existsSync(this.#configDir)) {
      FileSystemHelper.mkdirSync(this.#configDir);
    }

    if (!FileSystemHelper.existsSync(this.#configPath)) {
      const newConfig = getDefaultConfig();
      FileSystemHelper.writeJSONFile(this.#configPath, newConfig);
      return newConfig;
    }

    const configuration = FileSystemHelper.readJSONFileSync<Configuration>(this.#configPath);
    // TODO validate configuration version and structure
    return configuration;
  }

  deactivatePlugin(pluginName: string) {
    delete this.#configuration?.plugins[pluginName];
    this.saveConfig();
  }

  activatePlugin(pluginName: string) {
    this.#configuration.plugins[pluginName] = {
      enabled: true
    };
    this.saveConfig();
  }

  setPluginSettings(pluginName: string, settings: PluginSettings) {
    this.#configuration.plugins[pluginName] = settings;
    this.saveConfig();
  }

  saveConfig() {
    FileSystemHelper.writeJSONFile(this.#configPath, this.#configuration);
  }

  get configuration(): Configuration {
    return this.#configuration;
  }

  get pluginsDir(): string {
    return this.#pluginsDir;
  }

  getAvailablePlugins() {
    return Object.entries(this.#pluginsConfiguration).flatMap(([groupKey, groupInfo]) => {
      return groupInfo.plugins.map(plugin => ({
        name: plugin.name,
        description: plugin.description,
        group: groupKey
      }));
    });
  }

  getActivePluginsName(): string[] {
    return Object.entries(this.#configuration.plugins)
      .filter(([, settings]) => settings.enabled)
      .map(([name]) => name);
  }

  getActivePlugins(): PluginsConfiguration {
    const activePlugins = this.getActivePluginsName();
    const result: PluginsConfiguration = {};

    Object.entries(this.#pluginsConfiguration).forEach(([groupKey, groupInfo]) => {
      const activePluginsInGroup = groupInfo.plugins.filter(plugin => activePlugins.includes(plugin.name));

      if (activePluginsInGroup.length > 0) {
        result[groupKey] = {
          name: groupInfo.name,
          description: groupInfo.description,
          plugins: activePluginsInGroup
        };
      }
    });

    return result;
  }
}
