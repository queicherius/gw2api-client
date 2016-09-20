const AbstractEndpoint = require('../endpoint.js')

class OutfitsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/outfits'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = OutfitsEndpoint
