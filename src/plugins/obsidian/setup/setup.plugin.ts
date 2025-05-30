import inquirer from 'inquirer';

import { Plugin } from '../../../core/plugins/Plugin.js';
import { Settings } from '../../../core/Settings.js';

class SetupPlugin extends Plugin {
  constructor(settings: Settings) {
    super('setup', 'Setup Obsidian plugins', settings);
  }

  async run(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'vaultPath',
        message: 'Enter your Obsidian vault path:',
        validate: input => input.length > 0 || 'Please enter a valid path'
      },
      {
        type: 'input',
        name: 'dailyNotesPath',
        message: 'Enter your daily notes folder path (relative to vault):',
        default: 'Daily'
      },
      {
        type: 'input',
        name: 'archivePath',
        message: 'Enter your archive folder path (relative to vault):',
        default: 'archived'
      }
    ]);

    // Save the configuration
    this.setSettingsFrom('obsidian', {
      vaultPath: answers.vaultPath,
      dailyNotesPath: answers.dailyNotesPath,
      archivePath: answers.archivePath
    });

    console.log('Obsidian configuration saved successfully!');
  }
}

export default SetupPlugin;
