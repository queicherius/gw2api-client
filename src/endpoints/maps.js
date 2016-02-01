const AbstractEndpoint = require('../endpoint.js')

class MapsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/maps'
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
  }
}

module.exports = MapsEndpoint
