import search from '@inquirer/search';

import { Settings } from '../Settings.js';

export const configurePluginsAction = (settings: Settings) => async () => {
  const available = settings.getAvailablePlugins();
  const active = settings.getActivePluginsName();

  const choices = available.map(plugin => ({
    name: `${active.includes(plugin.name) ? '✓ ' : '  '}${plugin.name}`,
    value: plugin.name,
    description: active.includes(plugin.name) ? 'Active' : 'Inactive'
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
    settings.deactivatePlugin(selected);
  } else {
    settings.activatePlugin(selected);
  }

  console.log(`Plugin ${selected} ${isActive ? 'deactivated' : 'activated'} successfully.`);
};
