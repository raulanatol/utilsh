import os from 'node:os';
import path from 'node:path';

import { FileSystemHelper } from './helpers/FileSystemHelper.js';
import { PluginSettings } from './plugin-manager.js';

const getDefaultConfig = () => ({
  version: 1,
  plugins: {}
});

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

  constructor() {
    this.#configDir = path.join(os.homedir(), '.config', 'utilsh');
    this.#configPath = path.join(this.#configDir, 'config.json');
    this.#pluginsDir = path.join(process.cwd(), 'src', 'plugins');
    this.#configuration = this.loadOrCreateConfig();
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

  removePlugin(pluginName: string) {
    delete this.#configuration?.plugins[pluginName];
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
}
