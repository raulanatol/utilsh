import { Settings } from '../Settings.js';

export abstract class Plugin {
  readonly #name: string;
  readonly #description: string;
  readonly #settings: Settings;

  protected constructor(name: string, description: string, settings: Settings) {
    this.#name = name;
    this.#description = description;
    this.#settings = settings;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  getSettingsFrom<T>(settingsGroupName: string): T | null {
    return this.#settings.getSettings<T>(settingsGroupName);
  }

  setSettingsFrom(settingsGroupName: string, settings: Record<string, string>): void {
    this.#settings.setSettings(settingsGroupName, settings);
  }

  abstract run(parameters?: string[]): Promise<void>;
}
