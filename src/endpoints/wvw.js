const AbstractEndpoint = require('../endpoint.js')

class WvwEndpoint extends AbstractEndpoint {
  abilities () {
    return new AbilitiesEndpoint(this.client)
  }

  matches () {
    return new MatchesEndpoint(this.client)
  }

  objectives () {
    return new ObjectivesEndpoint(this.client)
  }
}

class AbilitiesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/abilities'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

class MatchesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/matches'
    this.isPaginated = true
    this.isBulk = true
  }
}

class ObjectivesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/objectives'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = WvwEndpoint
