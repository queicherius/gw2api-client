const AbstractEndpoint = require('../endpoint.js')

class PetsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pets'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = PetsEndpoint
