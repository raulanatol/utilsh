import { Command } from 'commander';

export const helpPlugin = (program: Command): void => {
  program
    .command('help')
    .description('List all available plugins and commands')
    .action(() => {
      console.log('Available plugins:');
      program.commands.forEach((cmd) => {
        console.log(`  ${cmd.name()}: ${cmd.description()}`);
      });
    });
}; 