const AbstractEndpoint = require('../endpoint')

module.exports = class LegendaryarmoryEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/legendaryarmory'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
