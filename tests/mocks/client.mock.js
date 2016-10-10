import fetch from 'lets-fetch/mock'

export const mockClient = {
  lang: false,
  apiKey: false,
  fetch: fetch,
  language: function (lang) {
    this.lang = lang
  },
  authenticate: function (key) {
    this.apiKey = key
  }
}

export const fetchMock = fetch
