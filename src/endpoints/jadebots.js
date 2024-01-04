const AbstractEndpoint = require('../endpoint')

module.exports = class JadebotsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/jadebots'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
