const AbstractEndpoint = require('../endpoint.js')

class ProfessionsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/professions'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = ProfessionsEndpoint
