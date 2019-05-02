const pkg = require('./package.json');

module.exports = {
  pwa: {
    assetsVersion: pkg.version,
    workboxOptions: {
      cacheId: `open-olhovivo-${pkg.version}`,
    },
  },
};
