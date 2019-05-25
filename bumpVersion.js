const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const versionBody = JSON.stringify({ version: pkg.version }, null, '\t');

const srcDestPath = path.join(__dirname, 'src', 'version.json');
const jsonDestPath = path.join(__dirname, 'public', 'version.json');

fs.writeFileSync(srcDestPath, versionBody);
fs.writeFileSync(jsonDestPath, versionBody);
