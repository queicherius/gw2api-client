const AbstractEndpoint = require('../endpoint')

module.exports = class TraitsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/traits'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
