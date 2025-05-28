#!/usr/bin/env node

import { Command } from 'commander';
import { PluginManager } from './plugin-manager';
import inquirer from 'inquirer';

const program = new Command();
const pluginManager = new PluginManager();

program
  .name('utilsh')
  .description('CLI tool with plugin system')
  .version('1.0.0');

const pluginsCmd = program.command('plugins').description('Gestión de plugins');

pluginsCmd
  .command('list')
  .description('Listar plugins activos (en config)')
  .action(() => {
    const activos = pluginManager.getActivePlugins();
    if (activos.length === 0) {
      console.log('No hay plugins activos.');
    } else {
      console.log('Plugins activos:');
      activos.forEach((p) => console.log('  -', p));
    }
  });

pluginsCmd
  .command('available')
  .description('Listar plugins instalados en node_modules')
  .action(() => {
    const disponibles = pluginManager.getAvailablePlugins();
    if (disponibles.length === 0) {
      console.log('No hay plugins instalados.');
    } else {
      console.log('Plugins instalados:');
      disponibles.forEach((p) => console.log('  -', p));
    }
  });

pluginsCmd
  .command('add <plugin> [settings]')
  .description(
    'Añadir un plugin al config. Puedes pasar settings como JSON o dejarlo vacío para modo interactivo.',
  )
  .action(async (plugin, settings) => {
    let parsedSettings;
    if (settings) {
      try {
        parsedSettings = JSON.parse(settings);
        parsedSettings.enabled = true;
      } catch (e) {
        console.error('El parámetro settings debe ser un JSON válido.');
        process.exit(1);
      }
    } else {
      parsedSettings = { enabled: true };
      // Preguntar por settings extra
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'custom',
          message:
            '¿Quieres añadir algún setting extra? (key:value, vacío para omitir)',
        },
      ]);
      if (answers.custom) {
        const [key, value] = answers.custom.split(':');
        if (key && value) parsedSettings[key.trim()] = value.trim();
      }
    }
    pluginManager.addPlugin(plugin, parsedSettings);
    console.log(`Plugin ${plugin} añadido y activado.`);
  });

pluginsCmd
  .command('remove <plugin>')
  .description('Eliminar un plugin del config')
  .action((plugin) => {
    pluginManager.removePlugin(plugin);
    console.log(`Plugin ${plugin} eliminado del config.`);
  });

// Registrar plugins activos
pluginManager.loadPlugins(program);

program.parse();
