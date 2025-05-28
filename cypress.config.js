const { defineConfig } = require("cypress");

const envVariables = {
  LANGUAGE: 'en', // default bahasa, bisa diubah saat run
  labelYoutube: {
    en: {
      explore: "Explore",
      trend: "Trending",
      movie: "Movies",
      share: "Share"
    },
    id: {
      explore: "Eksplorasi",
      trend: "Trending",
      movie: "Film",
      share: "Bagikan"
    },
  },
};

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: true,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 40000,
  },
  video: true,
  locale: 'en',
  env: envVariables
});
