import fetch from 'lets-fetch/mock'
import cache from '../../src/cache/memory'

export const mockClient = {
  lang: false,
  apiKey: false,
  fetch: fetch,
  cache: cache(),
  language: function (lang) {
    this.lang = lang
  },
  authenticate: function (key) {
    this.apiKey = key
  }
}

export const fetchMock = fetch
