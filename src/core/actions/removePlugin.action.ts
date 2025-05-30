import { PluginManager } from '../plugin-manager.js';

export const removePluginAction = (pluginManager: PluginManager) => (plugin: string) => {
  pluginManager.removePlugin(plugin);
  console.log(`Plugin ${plugin} removed from config.`);
};
