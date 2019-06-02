exports.config = {
  tests: './tests/e2e/*.test.js',
  output: './output/e2e',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
    },
    Mochawesome: {
      uniqueScreenshotNames: true,
    },
  },
  include: {
    search: './tests/e2e/pageObjects/search.js',
    menu: './tests/e2e/pageObjects/menu.js',
    busItem: './tests/e2e/pageObjects/busItem.js',
    map: './tests/e2e/pageObjects/map.js',
    app: './tests/e2e/pageObjects/app.js',
  },
  gherkin: {
    features: './tests/e2e/features/*.feature',
    steps: [
      './tests/e2e/step_definitions/steps.js',
      './tests/e2e/step_definitions/menu.steps.js',
      './tests/e2e/step_definitions/search.steps.js',
      './tests/e2e/step_definitions/favorite.steps.js',
      './tests/e2e/step_definitions/map.steps.js',
    ],
  },
  plugins: {
    stepByStepReport: {
      enabled: true,
    },
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      reportDir: './output',
      reportFilename: 'report',
    },
  },
  name: 'open-olhovivo',
};
