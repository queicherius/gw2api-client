const AbstractEndpoint = require('../endpoint.js')

class SpecializationsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/specializations'
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = SpecializationsEndpoint
