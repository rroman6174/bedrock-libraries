import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { glob } from 'glob-promise';
const parse = JSON.parse;
const stringify = JSON.stringify;
// Update root package.json version
// execSync('npm version patch', { stdio: 'inherit' });

// Read the updated version
const rootPackageJsonPath = path.join(process.cwd(), 'package.json');
const rootPackageJson = parse(readFileSync(rootPackageJsonPath, 'utf8'));
const newVersion = rootPackageJson.version;

// Function to update version in library package.json
function updateLibraryVersion(libraryPath) {
  const packageJsonPath = path.join(process.cwd(), libraryPath, 'package.json');
  const packageJson = parse(readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = newVersion; // Update version
  writeFileSync(packageJsonPath, stringify(packageJson, null, 2) + '\n');
  console.log(`Updated ${libraryPath} to version ${newVersion}`);
}

// Assuming your libraries are located under 'libs' directory
const libraries = glob.glob.sync('libs/*');
console.log(libraries);
libraries.forEach(updateLibraryVersion);
