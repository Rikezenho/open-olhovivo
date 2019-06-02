exports.config = {
  tests: './tests/e2e/*.test.js',
  output: './output/e2e',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
    },
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'open-olhovivo',
};
