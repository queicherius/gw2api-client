const AbstractEndpoint = require('../endpoint')

module.exports = class SkinsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/skins'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
