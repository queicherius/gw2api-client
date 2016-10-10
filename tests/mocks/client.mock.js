const reqMock = require('lets-fetch/mock')

const mockClient = {
  lang: false,
  apiKey: false,
  fetch: reqMock,
  language: function (lang) {
    this.lang = lang
  },
  authenticate: function (key) {
    this.apiKey = key
  }
}

module.exports = {mockClient, reqMock}
