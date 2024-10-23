const AbstractEndpoint = require('../endpoint')

module.exports = class HomesteadEndpoint extends AbstractEndpoint {
  decorations () {
    return new DecorationsEndpoint(this)
  }

  glyphs () {
    return new GlyphsEndpoint(this)
  }
}

class DecorationsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/homestead/decorations'
    this.isPaginated = true
    this.isLocalized = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.cacheTime = 24 * 60 * 60
  }

  categories () {
    return new DecorationsCategoriesEndpoint(this)
  }
}

class GlyphsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/homestead/glyphs'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}

class DecorationsCategoriesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/homestead/decorations/categories'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
