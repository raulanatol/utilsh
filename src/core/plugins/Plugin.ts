export abstract class Plugin {
  readonly #name: string;
  readonly #description: string;

  protected constructor(name: string, description: string) {
    this.#name = name;
    this.#description = description;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  abstract run(parameters?: string[]): Promise<void>;
}
