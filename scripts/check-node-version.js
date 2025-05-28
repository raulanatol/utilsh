const fs = require('fs');
const path = require('path');

const requiredVersion = fs.readFileSync(path.join(__dirname, '../.nvmrc'), 'utf8').trim();
const currentVersion = process.version;

if (currentVersion !== `v${requiredVersion}`) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Incorrect Node.js version');
  console.error(`Required version: v${requiredVersion}`);
  console.error(`Current version: ${currentVersion}`);
  console.error('\nPlease install and use Node.js version', requiredVersion);
  process.exit(1);
}

console.log('\x1b[32m%s\x1b[0m', '✅ Correct Node.js version'); 