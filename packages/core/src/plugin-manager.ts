import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.config', 'utilsh');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');

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
  private plugins: Map<string, unknown> = new Map();
  private config: UtilshConfig;

  constructor() {
    this.config = this.loadOrCreateConfig();
  }

  private loadOrCreateConfig(): UtilshConfig {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    if (!fs.existsSync(CONFIG_PATH)) {
      // Detectar plugins instalados
      const detected = this.detectInstalledPlugins();
      const initialConfig: UtilshConfig = { plugins: {} };
      detected.forEach((plugin) => {
        initialConfig.plugins[plugin] = { enabled: true };
      });
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(initialConfig, null, 2));
      return initialConfig;
    }
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  }

  private detectInstalledPlugins(): string[] {
    const nodeModules = path.join(process.cwd(), 'node_modules', '@raulanator');
    if (!fs.existsSync(nodeModules)) return [];
    return fs
      .readdirSync(nodeModules)
      .filter((name) => name.startsWith('plugin-'))
      .map((name) => `@raulanator/${name}`);
  }

  getConfig(): UtilshConfig {
    return this.config;
  }

  saveConfig(): void {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(this.config, null, 2));
  }

  getActivePlugins(): string[] {
    return Object.entries(this.config.plugins)
      .filter(([, settings]) => settings.enabled)
      .map(([name]) => name);
  }

  getAvailablePlugins(): string[] {
    return this.detectInstalledPlugins();
  }

  addPlugin(
    pluginName: string,
    settings: PluginSettings = { enabled: true },
  ): void {
    this.config.plugins[pluginName] = settings;
    this.saveConfig();
  }

  removePlugin(pluginName: string): void {
    delete this.config.plugins[pluginName];
    this.saveConfig();
  }

  async loadPlugins(program: Command): Promise<void> {
    for (const [pluginName, settings] of Object.entries(this.config.plugins)) {
      if (!settings.enabled) continue;
      try {
        const plugin = await import(pluginName);
        if (typeof plugin.default === 'function') {
          plugin.default(program, settings);
          this.plugins.set(pluginName, plugin);
        }
      } catch (error) {
        console.error(`Error loading plugin ${pluginName}:`, error);
      }
    }
  }

  getPlugins(): Map<string, unknown> {
    return this.plugins;
  }
}
