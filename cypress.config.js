const { defineConfig } = require("cypress");
const { DateTime } = require("luxon");
const { fakerID_ID: faker } = require("@faker-js/faker")

const gender = faker.helpers.arrayElement(['male', 'female']);
const firstPerson = faker.person.firstName(gender);
const middlePerson = faker.person.middleName(gender);
const lastPerson = faker.person.lastName();
const emailPerson = faker.internet.email({firstName: firstPerson.toLowerCase(), lastName: lastPerson.toLowerCase(), provider: 'gmail.com'})
const phonePerson = `857${faker.number.int({min: 11111111,max: 99999999})}`

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
    departureAirport: "Soekarno-Hatta International Airport",
    departureFrom: "CGK",
    cityArrival: "Singapore",
    arrivalAirport: "Singapore Changi Airport",
    arrivalTo: "SIN",
    cabinType: "Economy",
    passenger: 1,
    today: DateTime.now(),
    nextDay: DateTime.now().plus({days:1}),
    contactDetails: {
      firstName: firstPerson,
      middleName: middlePerson,
      lastName: lastPerson,
      email: emailPerson,
      phone: phonePerson,
      nationality: 'Indonesia',
      sex: gender
    }
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
    defaultCommandTimeout: 60000,
    env:{
      ...envVariables
    }
  },
  video: true,
  locale: 'en'
});
