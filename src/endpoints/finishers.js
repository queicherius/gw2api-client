const AbstractEndpoint = require('../endpoint.js')

class FinishersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/finishers'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = FinishersEndpoint
