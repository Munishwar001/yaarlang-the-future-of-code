#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import compiler from './compiler.js';
import runner from './runtime.js';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: yaarlang <file.yl>');
  process.exit(1);
}

const resolvedPath = path.resolve(process.cwd(), filePath);

if (!fs.existsSync(resolvedPath)) {
  console.error(`File not found: ${resolvedPath}`);
  process.exit(1);
}

const source = fs.readFileSync(resolvedPath, 'utf-8');

try {
  const code = compiler(source);
  runner(code);
} catch (err) {
  console.error(`YaarLang error: ${err.message}`);
  process.exit(1);
}
