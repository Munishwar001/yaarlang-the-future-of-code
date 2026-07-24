#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import compiler from './compiler.js';
import runner from './runtime.js';

const filePath = process.argv[2];

function printError(message) {
  console.error(`\x1b[31m${message}\x1b[39m`);
}

if (!filePath) {
  printError('Usage: yaarlang <file.yl>');
  process.exit(1);
}

const resolvedPath = path.resolve(process.cwd(), filePath);

if (!fs.existsSync(resolvedPath)) {
  printError(`File not found: ${resolvedPath}`);
  process.exit(1);
}

const source = fs.readFileSync(resolvedPath, 'utf-8');

try {
  const code = compiler(source);
  runner(code);
} catch (err) {
  printError(`YaarLang error: ${err.message}`);
  process.exit(1);
}
