const AbstractEndpoint = require('../endpoint.js')

class SkinsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/skins'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
  }
}

module.exports = SkinsEndpoint
