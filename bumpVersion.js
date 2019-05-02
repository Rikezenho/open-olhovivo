const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const destPath = path.join(__dirname, 'public', 'version.json');

fs.writeFileSync(destPath, JSON.stringify({ version: pkg.version }, null, '\t'));
