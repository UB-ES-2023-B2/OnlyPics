const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://pre-main--superlative-ganache-0e40d4.netlify.app',
  },
});
