const AbstractEndpoint = require('../endpoint.js')

class PvpEndpoint extends AbstractEndpoint {
  amulets () {
    return new AmuletsEndpoint(this.client)
  }

  games () {
    return new GamesEndpoint(this.client)
  }

  seasons () {
    return new SeasonsEndpoint(this.client)
  }

  standings () {
    return new StandingsEndpoint(this.client)
  }

  stats () {
    return new StatsEndpoint(this.client)
  }
}

class AmuletsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/amulets'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

class GamesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/games'
    this.isPaginated = true
    this.isBulk = true
    this.isAuthenticated = true
  }
}

class SeasonsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/seasons'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

class StandingsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/standings'
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
