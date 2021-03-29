/**
 * This script compiles the PostCSS config into lib/config.json
 * for the published packages.
 */
const chalk = require('chalk')
const content = require('../src/postcss/vars/index.js');
const writeFileSyncRecursive = require('./utils/write-file');

console.log(chalk.blue('🤖 Generating lib/config.json...'))

writeFileSyncRecursive('./lib/config.json', JSON.stringify(content, null, 2))

console.log(chalk.green('🚀 Generated lib/config.json'));
