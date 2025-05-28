const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const path = require('path');

const rootPackageJson = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const workspaces = rootPackageJson.workspaces;

function checkGitStatus() {
  const status = execSync('git status --porcelain').toString();
  if (status) {
    console.error('❌ Hay cambios sin commitear. Por favor, haz commit de tus cambios antes de publicar.');
    process.exit(1);
  }
}

function checkNpmAuth() {
  try {
    execSync('npm whoami');
  } catch (error) {
    console.error('❌ No estás autenticado en npm. Por favor, ejecuta `npm login` primero.');
    process.exit(1);
  }
}

function publishPackage(packagePath) {
  try {
    console.log(`📦 Publicando ${packagePath}...`);
    execSync(`npm publish ${packagePath} --access public`, { stdio: 'inherit' });
    console.log(`✅ ${packagePath} publicado exitosamente`);
  } catch (error) {
    console.error(`❌ Error al publicar ${packagePath}:`, error.message);
    process.exit(1);
  }
}

function main() {
  console.log('🚀 Iniciando proceso de publicación...');
  
  // Verificar estado del git
  checkGitStatus();
  
  // Verificar autenticación de npm
  checkNpmAuth();
  
  // Construir todos los paquetes
  console.log('🔨 Construyendo paquetes...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Publicar cada paquete
  workspaces.forEach(workspace => {
    if (workspace.includes('*')) {
      // Manejar patrones glob
      const packages = execSync(`ls -d ${workspace}`).toString().split('\n').filter(Boolean);
      packages.forEach(pkg => publishPackage(pkg));
    } else {
      publishPackage(workspace);
    }
  });
  
  console.log('🎉 ¡Proceso de publicación completado!');
}

main(); 