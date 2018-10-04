const AbstractEndpoint = require('../endpoint')

module.exports = class RaidsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/raids'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
