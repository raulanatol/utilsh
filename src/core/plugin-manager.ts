import fs from 'fs';
import os from 'os';
import path from 'path';
import { Command } from 'commander';

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
  const entries = fs.readdirSync(dir, { withFileTypes: true });
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
      detected.forEach(plugin => {
        initialConfig.plugins[plugin.name] = { enabled: true };
      });
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(initialConfig, null, 2));
      return initialConfig;
    }
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  }

  private detectInstalledPlugins(): PluginInfo[] {
    if (!fs.existsSync(PLUGINS_DIR)) {
      return [];
    }

    return findPlugins(PLUGINS_DIR);
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
    return this.detectInstalledPlugins().map(plugin => plugin.name);
  }

  getMetadataFrom(pluginName: string): PluginMetadata | null {
    const pluginPath = path.join(PLUGINS_DIR, pluginName, `${pluginName}.plugin.json`);
    if (!fs.existsSync(pluginPath)) {
      return null;
    }

    try {
      const pluginMetadata: unknown = JSON.parse(fs.readFileSync(pluginPath, 'utf-8'));
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
