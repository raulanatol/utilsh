import fs from 'fs';
import { PathLike } from 'node:fs';
import os from 'os';
import path from 'path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PluginManager } from '../plugin-manager.js';

// Mock fs module
vi.mock('fs');
const mockedFs = fs as unknown as ReturnType<typeof vi.mocked<typeof fs>>;

describe('PluginManager', () => {
  let pluginManager: PluginManager;
  const mockConfigDir = path.join(os.homedir(), '.config', 'utilsh');
  const mockConfigPath = path.join(mockConfigDir, 'config.json');
  const mockPluginsDir = path.join(process.cwd(), 'src', 'plugins');

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock fs.existsSync
    mockedFs.existsSync.mockImplementation((path: PathLike) => {
      if (path === mockConfigDir) return true;
      if (path === mockConfigPath) return true;
      if (path === mockPluginsDir) return true;
      return false;
    });

    // Mock fs.readdirSync
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    mockedFs.readdirSync.mockReturnValue(['plugin1.ts', 'plugin2.js']);

    // Mock fs.readFileSync
    mockedFs.readFileSync.mockReturnValue(
      JSON.stringify({
        plugins: {
          plugin1: { enabled: true },
          plugin2: { enabled: false }
        }
      })
    );

    pluginManager = new PluginManager();
  });

  describe('initialization', () => {
    it('should create config directory if it does not exist', () => {
      mockedFs.existsSync.mockReturnValueOnce(false);
      new PluginManager();
      expect(mockedFs.mkdirSync).toHaveBeenCalledWith(mockConfigDir, { recursive: true });
    });

    it('should create initial config if it does not exist', () => {
      mockedFs.existsSync.mockImplementation((path: PathLike) => {
        if (path === mockConfigPath) {
          return false;
        }
        return true;
      });

      new PluginManager();
      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(mockConfigPath, expect.any(String));
    });
  });

  describe('plugin detection', () => {
    it('should detect installed plugins', () => {
      const plugins = pluginManager.getAvailablePlugins();
      expect(plugins).toContain(path.join(mockPluginsDir, 'plugin1.ts'));
      expect(plugins).toContain(path.join(mockPluginsDir, 'plugin2.js'));
    });

    it('should return empty array if plugins directory does not exist', () => {
      mockedFs.existsSync.mockReturnValueOnce(false);
      const plugins = pluginManager.getAvailablePlugins();
      expect(plugins).toHaveLength(0);
    });
  });

  describe('plugin management', () => {
    it('should add a new plugin', () => {
      pluginManager.addPlugin('newPlugin', { enabled: true });
      const config = pluginManager.getConfig();
      expect(config.plugins.newPlugin).toEqual({ enabled: true });
      expect(mockedFs.writeFileSync).toHaveBeenCalled();
    });

    it('should remove a plugin', () => {
      pluginManager.removePlugin('plugin1');
      const config = pluginManager.getConfig();
      expect(config.plugins.plugin1).toBeUndefined();
      expect(mockedFs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe('configuration management', () => {
    it('should save configuration', () => {
      pluginManager.saveConfig();
      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(mockConfigPath, expect.any(String));
    });

    it('should get current configuration', () => {
      const config = pluginManager.getConfig();
      expect(config).toEqual({
        plugins: {
          plugin1: { enabled: true },
          plugin2: { enabled: false }
        }
      });
    });
  });
});
