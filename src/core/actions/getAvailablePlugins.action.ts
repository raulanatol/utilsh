import { PluginManager } from '../plugin-manager.js';

export const getAvailablePluginsAction = (pluginManager: PluginManager) => () => {
  const available = pluginManager.getAvailablePlugins();
  available.forEach(plugin => {
    const metadata = pluginManager.getMetadataFrom(plugin);
    console.log('- ', plugin, metadata ? `(${metadata.description})` : '');
  });
};
