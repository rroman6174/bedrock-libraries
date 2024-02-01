import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { glob } from 'glob-promise';
import { publishVersion } from './publish.mjs';
const parse = JSON.parse;
const stringify = JSON.stringify;
// Update root package.json version
// execSync('npm version patch', { stdio: 'inherit' });

// Assuming your libraries are located under 'libs' directory
const libraries = glob.glob.sync('libs/*');
const [, , otp] = process.argv;
if (!otp) {
  console.error('No OTP token provided.');
  process.exit(1);
}

for (const library of libraries) {
  publishVersion(path.basename(library), otp);
}
