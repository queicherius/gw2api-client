const AbstractEndpoint = require('../endpoint.js')

class ItemsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/items'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
  }
}

module.exports = ItemsEndpoint
