const reqMock = require('gw2e-requester/mock')

const mockClient = {
  lang: false,
  apiKey: false,
  requester: reqMock,
  language: function (lang) {
    this.lang = lang
  },
  authenticate: function (key) {
    this.apiKey = key
  }
}

module.exports = {mockClient, reqMock}
