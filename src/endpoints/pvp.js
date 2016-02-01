const AbstractEndpoint = require('../endpoint.js')

class PvpEndpoint extends AbstractEndpoint {
  games () {
    return new GamesEndpoint(this.client)
  }

  stats () {
    return new StatsEndpoint(this.client)
  }
}

class GamesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/games'
    this.isBulk = true
    this.isAuthenticated = true
  }
}

class StatsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/stats'
    this.isAuthenticated = true
  }
}

module.exports = PvpEndpoint
