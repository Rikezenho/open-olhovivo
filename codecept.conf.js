exports.config = {
  tests: './tests/e2e/*.test.js',
  output: './output/e2e',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
    },
  },
  include: {
    search: './tests/e2e/pageObjects/search.js',
    menu: './tests/e2e/pageObjects/menu.js',
    busItem: './tests/e2e/pageObjects/busItem.js',
    map: './tests/e2e/pageObjects/map.js',
    app: './tests/e2e/pageObjects/app.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'open-olhovivo',
};
