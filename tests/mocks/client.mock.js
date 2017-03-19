import fetch from 'lets-fetch/mock'
import nullCache from '../../src/cache/null'
import memoryCache from '../../src/cache/memory'

export const mockClient = {
  lang: 'en',
  apiKey: false,
  fetch: fetch,
  caches: [nullCache(), memoryCache(), memoryCache()],
  headersObject: {},
  language: function (lang) {
    this.lang = lang
  },
  authenticate: function (key) {
    this.apiKey = key
  }
}

export const fetchMock = fetch
