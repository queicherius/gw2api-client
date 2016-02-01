const AbstractEndpoint = require('../endpoint.js')

class WvwEndpoint extends AbstractEndpoint {
  matches () {
    return new MatchesEndpoint(this.client)
  }

  objectives () {
    return new ObjectivesEndpoint(this.client)
  }
}

class MatchesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/matches'
    this.isBulk = true
  }
}

class ObjectivesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/objectives'
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = WvwEndpoint
