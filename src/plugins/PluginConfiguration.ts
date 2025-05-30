import { PluginsConfiguration } from '../core/plugins/PluginsConfiguration.js';

export const PluginConfiguration: PluginsConfiguration = {
  obsidian: {
    name: 'Obsidian',
    description: 'Plugins for Obsidian integration',
    plugins: [
      {
        name: 'daily-archive',
        description: 'Archive daily notes in Obsidian'
      }
    ]
  },
  files: {
    name: 'Files',
    description: 'Plugins for file management',
    plugins: [
      {
        name: 'series',
        description: 'Sync TV series from Trakt.tv to Obsidian'
      },
      {
        name: 'movies',
        description: 'Sync movies from Trakt.tv to Obsidian'
      }
    ]
  }
};
