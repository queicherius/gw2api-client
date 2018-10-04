const fetch = require('lets-fetch/mock')
const nullCache = require('../../src/cache/null')
const memoryCache = require('../../src/cache/memory')

const mockClient = {
  lang: 'en',
  apiKey: false,
  fetch: fetch,
  caches: [nullCache(), memoryCache(), memoryCache()],
  language: function (lang) {
    this.lang = lang
  },
  authenticate: function (key) {
    this.apiKey = key
  }
}

mockClient.client = mockClient

module.exports = {
  mockClient: mockClient,
  fetchMock: fetch
}
