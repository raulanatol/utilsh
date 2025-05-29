import { Plugin } from '../../core/Plugin.js';

class HelloPlugin extends Plugin {
  constructor() {
    super('hello', 'Print a hello world message');
  }

  run(parameters?: string[]): Promise<void> {
    console.log('hello.plugin.ts [11]', parameters);
    console.log('Hello, World!');
    return Promise.resolve();
  }
}

export default HelloPlugin;
