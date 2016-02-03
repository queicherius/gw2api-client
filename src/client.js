require('babel-polyfill')

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

  account () {
    return new (require('./endpoints/account.js'))(this)
  }

  achievements () {
    return new (require('./endpoints/achievements.js'))(this)
  }

  build () {
    return new (require('./endpoints/build.js'))(this)
  }

  characters () {
    return new (require('./endpoints/characters.js'))(this)
  }

  colors () {
    return new (require('./endpoints/colors.js'))(this)
  }

  commerce () {
    return new (require('./endpoints/commerce.js'))(this)
  }

  continents () {
    return new (require('./endpoints/continents.js'))(this)
  }

  currencies () {
    return new (require('./endpoints/currencies.js'))(this)
  }

  emblem () {
    return new (require('./endpoints/emblem.js'))(this)
  }

  events () {
    return new (require('./endpoints/events.js'))(this)
  }

  files () {
    return new (require('./endpoints/files.js'))(this)
  }

  guild () {
    return new (require('./endpoints/guild.js'))(this)
  }

  items () {
    return new (require('./endpoints/items.js'))(this)
  }

  maps () {
    return new (require('./endpoints/maps.js'))(this)
  }

  materials () {
    return new (require('./endpoints/materials.js'))(this)
  }

  minis () {
    return new (require('./endpoints/minis.js'))(this)
  }

  pvp () {
    return new (require('./endpoints/pvp.js'))(this)
  }

  quaggans () {
    return new (require('./endpoints/quaggans.js'))(this)
  }

  recipes () {
    return new (require('./endpoints/recipes.js'))(this)
  }

  skills () {
    return new (require('./endpoints/skills.js'))(this)
  }

  skins () {
    return new (require('./endpoints/skins.js'))(this)
  }

  specializations () {
    return new (require('./endpoints/specializations.js'))(this)
  }

  tokeninfo () {
    return new (require('./endpoints/tokeninfo.js'))(this)
  }

  traits () {
    return new (require('./endpoints/traits.js'))(this)
  }

  worlds () {
    return new (require('./endpoints/worlds.js'))(this)
  }

  wvw () {
    return new (require('./endpoints/wvw.js'))(this)
  }
}

module.exports = Client
