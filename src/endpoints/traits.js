const AbstractEndpoint = require('../endpoint.js')

class TraitsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/traits'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = TraitsEndpoint
