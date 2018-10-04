const AbstractEndpoint = require('../endpoint')

module.exports = class QuaggansEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/quaggans'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
