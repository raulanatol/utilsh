import search from '@inquirer/search';

import { PluginManager } from '../plugin-manager.js';

export const activatePluginAction = (pluginManager: PluginManager) => async () => {
  const available = pluginManager.getAvailablePlugins();
  const active = pluginManager.getActivePlugins();

  const choices = available.map(plugin => ({
    name: `${active.includes(plugin) ? '✓ ' : '  '}${plugin}`,
    value: plugin,
    description: active.includes(plugin) ? 'Active' : 'Inactive'
  }));

  const selected = await search({
    message: 'Select a plugin to toggle (type to filter):',
    source: async (input = '') => {
      const searchTerm = input.toLowerCase();
      return choices.filter(
        choice => choice.name.toLowerCase().includes(searchTerm) || choice.value.toLowerCase().includes(searchTerm)
      );
    }
  });

  // Toggle the selected plugin state
  const isActive = active.includes(selected);
  if (isActive) {
    pluginManager.removePlugin(selected);
  } else {
    await pluginManager.addPlugin(selected, { enabled: true });
  }

  console.log(`Plugin ${selected} ${isActive ? 'deactivated' : 'activated'} successfully.`);
};
