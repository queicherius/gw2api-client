const AbstractEndpoint = require('../endpoint.js')

class TitlesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/titles'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = TitlesEndpoint
