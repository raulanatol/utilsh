import { Settings } from '../Settings.js';

export const getActivePluginsAction = (settings: Settings) => () => {
  const active = settings.getActivePluginsName();
  if (!active.length) {
    console.log('No active plugins.');
  } else {
    console.log('Active plugins:');
    active.forEach(p => console.log('  -', p));
  }
};
