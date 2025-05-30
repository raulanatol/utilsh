import path from 'path';

import { FileSystemHelper } from './helpers/FileSystemHelper.js';
import { Plugin } from './Plugin.js';
import { Settings } from './Settings.js';

interface PluginMetadata {
  name: string;
  description: string;
}

interface PluginInfo {
  path: string;
  name: string;
}

const findPlugins = (dir: string): PluginInfo[] => {
  const entries = FileSystemHelper.readdirWithFileTypesSync(dir);
  const plugins: PluginInfo[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      plugins.push(...findPlugins(fullPath));
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.plugin.ts')) {
        const pluginDir = path.dirname(fullPath);
        const pluginName = path.basename(pluginDir);
        plugins.push({
          path: fullPath,
          name: pluginName
        });
      }
    }
  }

  return plugins;
};

export interface PluginSettings {
  enabled: boolean;

  [key: string]: unknown;
}

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  readonly #settings: Settings;

  constructor(settings: Settings) {
    this.#settings = settings;
  }

  private detectInstalledPlugins(): PluginInfo[] {
    if (!FileSystemHelper.existsSync(this.#settings.pluginsDir)) {
      return [];
    }

    return findPlugins(this.#settings.pluginsDir);
  }

  getActivePlugins(): string[] {
    return Object.entries(this.#settings.configuration.plugins)
      .filter(([, settings]) => settings.enabled)
      .map(([name]) => name);
  }

  getAvailablePlugins(): string[] {
    return this.detectInstalledPlugins().map(plugin => plugin.name);
  }

  getMetadataFrom(pluginName: string): PluginMetadata | null {
    const pluginPath = path.join(this.#settings.pluginsDir, pluginName, `${pluginName}.plugin.json`);
    if (FileSystemHelper.existsSync(pluginPath)) {
      return null;
    }

    try {
      const pluginMetadata = FileSystemHelper.readJSONFileSync<PluginMetadata>(pluginPath);
      // TODO validate metadata structure
      return pluginMetadata as PluginMetadata;
    } catch (error) {
      console.error(`Error loading metadata for plugin ${pluginName}:`, error);
    }
    return null;
  }

  async loadPlugins(): Promise<void> {
    for (const [pluginName, settings] of Object.entries(this.#settings.configuration.plugins)) {
      if (settings.enabled) {
        await this.loadPlugin(pluginName);
      }
    }
  }

  private async loadPlugin(pluginName: string): Promise<Plugin | undefined> {
    try {
      const plugin = await import(path.join(this.#settings.pluginsDir, pluginName, `${pluginName}.plugin.js`));
      const newPlugin = new plugin.default();
      this.plugins.set(pluginName, newPlugin);
    } catch (error) {
      console.error(`Error loading plugin ${pluginName}:`, error);
    }
    return undefined;
  }

  async setup() {
    await this.loadPlugins();
  }

  getPlugins(): Map<string, Plugin> {
    return this.plugins;
  }

  async addPlugin(pluginName: string, settings: PluginSettings): Promise<void> {
    this.#settings.setPluginSettings(pluginName, settings);
    await this.loadPlugin(pluginName);
  }

  removePlugin(pluginName: string): void {
    this.#settings.removePlugin(pluginName);
    this.plugins.delete(pluginName);
  }
}
