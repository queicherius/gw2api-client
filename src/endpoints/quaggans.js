const AbstractEndpoint = require('../endpoint.js')

class QuaggansEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/quaggans'
    this.isPaginated = true
    this.isBulk = true
  }
}

module.exports = QuaggansEndpoint
