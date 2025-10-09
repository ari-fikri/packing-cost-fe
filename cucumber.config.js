const config = {
  default: {
    require: ['tests/e2e/step-definitions/**/*.js', 'tests/e2e/support/**/*.js'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['tests/e2e/features/**/*.feature'],
    publishQuiet: true,
    parallel: 1,
    requireModule: ['esm']
  }
};

module.exports = config;