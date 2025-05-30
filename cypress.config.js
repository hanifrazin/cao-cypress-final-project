const { defineConfig } = require("cypress");
const { DateTime } = require("luxon");

const envVariables = {
  LANGUAGE: 'en', // default bahasa, bisa diubah saat run
  youtube: {
    url: "https://www.youtube.com/",
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
  amazon: {
    url: "https://www.amazon.com/",
    typeKeyword: "chair"
  },
  agoda: {
    url: "https://www.agoda.com/", 
    cityFrom: "Jakarta",
    departureFrom: "CGK",
    cityArrival: "Singapore",
    arrivalTo: "SIN",
    cabinType: "Economy",
    passenger: 1,
    today: DateTime.now(),
    nextDay: DateTime.now().plus({days:1}),
  }
};

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: false,
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
    env:{
      ...envVariables
    }
  },
  video: true,
  locale: 'en'
});
