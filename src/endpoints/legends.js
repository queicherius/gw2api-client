const AbstractEndpoint = require('../endpoint.js')

class LegendsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/legends'
    this.isPaginated = true
    this.isBulk = true
  }
}

module.exports = LegendsEndpoint
