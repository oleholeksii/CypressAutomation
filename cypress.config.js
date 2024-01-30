const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 3000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
