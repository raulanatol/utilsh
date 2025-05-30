import inquirer from 'inquirer';

import { PluginManager } from '../plugin-manager.js';

const parseSettings = (rawSettings: string) => {
  if (!rawSettings) {
    return { enabled: true };
  }

  try {
    const settings = JSON.parse(rawSettings);
    settings.enabled = true;
    return settings;
  } catch (e) {
    console.error('The rawSettings parameter must be valid JSON.');
    process.exit(1);
  }
};

const askForExtraSettings = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'custom',
      message: 'Do you want to add any extra rawSettings? (key:value, empty to skip)'
    }
  ]);
  const result: Record<string, string> = {};
  if (answers.custom) {
    const [key, value] = (answers.custom as string).split(':');
    if (key && value) {
      result[key.trim()] = value.trim();
    }
  }
  return result;
};

export const addPluginAction = (pluginManager: PluginManager) => async (plugin: string, rawSettings: string) => {
  if (rawSettings) {
    const settings = parseSettings(rawSettings);
    pluginManager.addPlugin(plugin, settings);
    console.log(`Plugin ${plugin} added and enabled.`);
    return;
  }

  const extraSettings = await askForExtraSettings();
  const settings = {
    enabled: true,
    ...extraSettings
  };
  pluginManager.addPlugin(plugin, settings);
  console.log(`Plugin ${plugin} added and enabled.`);
};
