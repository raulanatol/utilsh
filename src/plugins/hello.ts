import { Command } from 'commander';

export const helloPlugin = (program: Command): void => {
  program
    .command('hello')
    .description('Print a hello world message')
    .action(() => {
      console.log('Hello, World!');
    });
}; 