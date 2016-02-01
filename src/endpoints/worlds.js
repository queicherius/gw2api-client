const AbstractEndpoint = require('../endpoint.js')

class WorldsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/worlds'
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = WorldsEndpoint
