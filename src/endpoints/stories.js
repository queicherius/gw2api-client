const AbstractEndpoint = require('../endpoint.js')

class StoriesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/stories'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }

  seasons () {
    return new SeasonsEndpoint(this.client)
  }
}

class SeasonsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/stories/seasons'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = StoriesEndpoint
