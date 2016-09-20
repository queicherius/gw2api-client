const requester = require('gw2e-requester')

class Client {
  constructor () {
    this.lang = 'en'
    this.apiKey = false
    this.requester = requester
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

  backstory () {
    return new (require('./endpoints/backstory.js'))(this)
  }

  build () {
    return new (require('./endpoints/build.js'))(this)
  }

  characters (name) {
    return new (require('./endpoints/characters.js'))(this, name)
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

  finishers () {
    return new (require('./endpoints/finishers.js'))(this)
  }

  guild (id) {
    return new (require('./endpoints/guild.js'))(this, id)
  }

  items () {
    return new (require('./endpoints/items.js'))(this)
  }

  itemstats () {
    return new (require('./endpoints/itemstats.js'))(this)
  }

  legends () {
    return new (require('./endpoints/legends.js'))(this)
  }

  maps () {
    return new (require('./endpoints/maps.js'))(this)
  }

  masteries () {
    return new (require('./endpoints/masteries.js'))(this)
  }

  materials () {
    return new (require('./endpoints/materials.js'))(this)
  }

  minis () {
    return new (require('./endpoints/minis.js'))(this)
  }

  outfits () {
    return new (require('./endpoints/outfits.js'))(this)
  }

  pets () {
    return new (require('./endpoints/pets.js'))(this)
  }

  professions () {
    return new (require('./endpoints/professions.js'))(this)
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

  stories () {
    return new (require('./endpoints/stories.js'))(this)
  }

  titles () {
    return new (require('./endpoints/titles.js'))(this)
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
