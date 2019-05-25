const webpack = require('webpack');
const pkg = require('./package.json');

const API_URLS = {
  development: 'http://localhost:3000',
  production: 'https://open-olhovivo-api.rikezenho.now.sh',
};

const API_URL = process.env.NODE_ENV === 'development' ? API_URLS.development : API_URLS.production;

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(API_URL),
      }),
    ],
  },
  pwa: {
    assetsVersion: pkg.version,
    workboxOptions: {
      cacheId: `open-olhovivo-${pkg.version}`,
      skipWaiting: true,
    },
  },
};
