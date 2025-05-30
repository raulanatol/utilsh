import { PluginManager } from '../plugin-manager.js';

export const getActivePluginsAction = (pluginManager: PluginManager) => () => {
  const active = pluginManager.getActivePlugins();
  if (!active.length) {
    console.log('No active plugins.');
  } else {
    console.log('Active plugins:');
    active.forEach(p => console.log('  -', p));
  }
};
