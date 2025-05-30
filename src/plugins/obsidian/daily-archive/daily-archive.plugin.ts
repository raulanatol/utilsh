import { join } from 'node:path';

import { FileSystemHelper } from '../../../core/helpers/FileSystemHelper.js';
import { Plugin } from '../../../core/plugins/Plugin.js';
import { Settings } from '../../../core/Settings.js';
import { ObsidianSettings } from '../setup/types.js';

const byName = (aFile: string, bFile: string) => aFile.localeCompare(bFile);

class DailyArchivePlugin extends Plugin {
  constructor(settings: Settings) {
    super('daily-archive', 'Archive daily notes in Obsidian', settings);
  }

  async run(): Promise<void> {
    const obsidianSettings = this.getSettingsFrom<ObsidianSettings>('obsidian');
    if (!obsidianSettings) {
      console.warn('Obsidian settings not found. Daily archive plugin will not run. Execute the setup plugin first.');
      return;
    }
    const dailyFolder = join(obsidianSettings.vaultPath, obsidianSettings.dailyNotesPath);
    const dailyFiles = FileSystemHelper.readFiles(dailyFolder, {
      filterByExtension: ['md']
    });
    if (dailyFiles.length < 2) {
      // Gets one file at least
      return;
    }

    const filesToArchive = dailyFiles.sort(byName);
    // Gets one file at least (extract the newest daily)
    filesToArchive.pop();

    for (const fileToMove of filesToArchive) {
      const archivedFolderName = fileToMove.substr(0, 'YYYY-MM'.length);
      FileSystemHelper.mkdir(join(dailyFolder, 'archived', archivedFolderName));

      const source = join(dailyFolder, fileToMove);
      const destination = join(dailyFolder, 'archived', archivedFolderName, fileToMove);

      FileSystemHelper.move(source, destination);
    }
  }
}

export default DailyArchivePlugin;
