import { Plugin } from '../../../core/plugins/Plugin.js';

class DailyArchivePlugin extends Plugin {
  constructor() {
    super('daily-archive', 'Archive daily notes in Obsidian');
  }

  run(parameters?: string[]): Promise<void> {
    console.log('dailyArchive.plugin.ts [9]', parameters);
    return Promise.resolve(undefined);
  }
}

export default DailyArchivePlugin;
