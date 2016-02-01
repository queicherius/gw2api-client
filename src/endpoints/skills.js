const AbstractEndpoint = require('../endpoint.js')

class SkillsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/skills'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = SkillsEndpoint
