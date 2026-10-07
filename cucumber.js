// Cucumber BDD runner configuration
// Defines feature paths, step definitions, reporting, and TypeScript support

module.exports = {
  default: {
    require: ["src/steps/**/*.ts", "src/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json",
      "allure-cucumberjs/reporter",
    ],
    paths: ["src/features/**/*.feature"],
    publishQuiet: true,
    timeout: 30000,
  },
};
