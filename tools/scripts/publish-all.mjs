import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path, { join } from 'path';
import { glob } from 'glob-promise';
import { publishVersion } from './publish.mjs';
const parse = JSON.parse;
const stringify = JSON.stringify;
// Update root package.json version
// execSync('npm version patch', { stdio: 'inherit' });

// Assuming your libraries are located under 'libs' directory
const libraries = glob.glob.sync('libs/*');

for (const library of libraries) {
  try {
    const version = JSON.parse(readFileSync('./package.json')).version;
    const tag = 'next';
    execSync(`npm publish --access public --tag ${tag}`, {
      cwd: join('dist', library),
      stdio: 'inherit',
    });
  } catch (error) {
    console.log(`Publish failed for ${library}`);
    console.error(error);
  }
}
