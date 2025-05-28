import { execSync } from 'child_process';

function checkGitStatus() {
  const status = execSync('git status --porcelain').toString();
  if (status) {
    console.error('❌ There are uncommitted changes. Please commit your changes before publishing.');
    process.exit(1);
  }
}

function checkNpmAuth() {
  try {
    execSync('npm whoami');
  } catch (error) {
    console.error('❌ You are not authenticated with npm. Please run `npm login` first.');
    process.exit(1);
  }
}

function publishPackage() {
  try {
    console.log('📦 Publishing package...');
    execSync('npm publish --access public', { stdio: 'inherit' });
    console.log('✅ Package published successfully');
  } catch (error) {
    console.error('❌ Error publishing the package:', error.message);
    process.exit(1);
  }
}

function main() {
  console.log('🚀 Starting publish process...');

  checkGitStatus();
  checkNpmAuth();

  console.log('🔨 Building package...');
  execSync('npm run build', { stdio: 'inherit' });

  publishPackage();

  console.log('🎉 Publish process completed!');
}

main();
