import updateNotifier from 'update-notifier';

import pkg from '../../package.json' with { type: 'json' };
import { PluginManager } from './plugin-manager.js';
import { Prompt } from './Prompt.js';

export class Runner {
  readonly #prompt: Prompt;
  readonly #pluginManager: PluginManager;

  constructor() {
    this.#pluginManager = new PluginManager();
    this.#prompt = new Prompt(this.#pluginManager);
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
