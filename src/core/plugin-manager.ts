import os from 'os';
import path from 'path';

import { FileSystemHelper } from './helpers/FileSystemHelper.js';
import { Plugin } from './Plugin.js';

const CONFIG_DIR = path.join(os.homedir(), '.config', 'utilsh');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');
const PLUGINS_DIR = path.join(process.cwd(), 'src', 'plugins');

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

export interface UtilshConfig {
  plugins: {
    [pluginName: string]: PluginSettings;
  };
}

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private readonly config: UtilshConfig;

  constructor() {
    this.config = this.loadOrCreateConfig();
  }

  private loadOrCreateConfig(): UtilshConfig {
    if (!FileSystemHelper.existsSync(CONFIG_DIR)) {
      FileSystemHelper.mkdirSync(CONFIG_DIR);
    }

    if (!FileSystemHelper.existsSync(CONFIG_PATH)) {
      const detected = this.detectInstalledPlugins();
      const initialConfig: UtilshConfig = { plugins: {} };
      detected.forEach(plugin => {
        initialConfig.plugins[plugin.name] = { enabled: true };
      });

      FileSystemHelper.writeJSONFileSync(CONFIG_PATH, initialConfig);
      return initialConfig;
    }

    return FileSystemHelper.readJSONFileSync<UtilshConfig>(CONFIG_PATH);
  }

  private detectInstalledPlugins(): PluginInfo[] {
    if (!FileSystemHelper.existsSync(PLUGINS_DIR)) {
      return [];
    }

    return findPlugins(PLUGINS_DIR);
  }

  getConfig(): UtilshConfig {
    return this.config;
  }

  saveConfig(): void {
    FileSystemHelper.writeJSONFileSync(CONFIG_PATH, this.config);
  }

  getActivePlugins(): string[] {
    return Object.entries(this.config.plugins)
      .filter(([, settings]) => settings.enabled)
      .map(([name]) => name);
  }

  getAvailablePlugins(): string[] {
    return this.detectInstalledPlugins().map(plugin => plugin.name);
  }

  getMetadataFrom(pluginName: string): PluginMetadata | null {
    const pluginPath = path.join(PLUGINS_DIR, pluginName, `${pluginName}.plugin.json`);
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

  addPlugin(pluginName: string, settings: PluginSettings = { enabled: true }): void {
    this.config.plugins[pluginName] = settings;
    this.saveConfig();
  }

  removePlugin(pluginName: string): void {
    delete this.config.plugins[pluginName];
    this.saveConfig();
  }

  async loadPlugins(): Promise<void> {
    for (const [pluginName, settings] of Object.entries(this.config.plugins)) {
      if (settings.enabled) {
        const newPlugin = await this.loadPlugin(pluginName);
        if (newPlugin) {
          this.plugins.set(pluginName, newPlugin);
        }
      }
    }
  }

  private async loadPlugin(pluginName: string): Promise<Plugin | undefined> {
    try {
      const plugin = await import(path.join(PLUGINS_DIR, pluginName, `${pluginName}.plugin.js`));
      return new plugin.default();
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
}
