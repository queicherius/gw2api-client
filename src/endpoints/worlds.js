const AbstractEndpoint = require('../endpoint.js')

class WorldsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/worlds'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = WorldsEndpoint
