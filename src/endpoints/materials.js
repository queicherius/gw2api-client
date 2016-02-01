const AbstractEndpoint = require('../endpoint.js')

class MaterialsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/materials'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = MaterialsEndpoint
