import updateNotifier from 'update-notifier';

import pkg from '../../package.json' with { type: 'json' };
import { PluginManager } from './plugins/PluginManager.js';
import { Prompt } from './Prompt.js';
import { Settings } from './Settings.js';

export class Runner {
  readonly #prompt: Prompt;
  readonly #pluginManager: PluginManager;
  readonly #settings: Settings;

  constructor() {
    this.#settings = new Settings();
    this.#pluginManager = new PluginManager(this.#settings);
    this.#prompt = new Prompt(this.#pluginManager, this.#settings);
  }

  async run(): Promise<void> {
    this.checkUpdates();
    await this.#prompt.setup();
    this.#prompt.run();
  }

  private checkUpdates() {
    updateNotifier({
      pkg: {
        name: pkg.name,
        version: pkg.version
      },
      updateCheckInterval: 0
    }).notify({ isGlobal: true });
  }
}
