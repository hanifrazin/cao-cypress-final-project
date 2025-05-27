const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chrome' && browser.name !== 'electron') {
          launchOptions.args.push('--lang=en-US');
          if (!launchOptions.preferences) {
            launchOptions.preferences = {};
          }
          if (!launchOptions.preferences.default) {
            launchOptions.preferences.default = {};
          }
          launchOptions.preferences.default.intl = {
            accept_languages: 'en-US',
          };
          return launchOptions;
        }
      });
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 40000,
  },
  video: true,
  locale: 'en',
});
