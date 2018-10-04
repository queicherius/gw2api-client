const AbstractEndpoint = require('../endpoint')

module.exports = class MasteriesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/masteries'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
