class Client {
  constructor () {
    this.lang = 'en'
    this.apiKey = false
  }

  // Set the language for locale-aware endpoints
  language (lang) {
    this.lang = lang
    return this
  }

  // Set the api key for authenticated endpoints
  authenticate (apiKey) {
    this.apiKey = apiKey
    return this
  }
}

module.exports = Client
