const AbstractEndpoint = require('../endpoint.js')

class MasteriesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/masteries'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = MasteriesEndpoint
