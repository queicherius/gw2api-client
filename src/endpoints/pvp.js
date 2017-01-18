import AbstractEndpoint from '../endpoint'

export default class PvpEndpoint extends AbstractEndpoint {
  amulets () {
    return new AmuletsEndpoint(this)
  }

  games () {
    return new GamesEndpoint(this)
  }

  ranks () {
    return new RanksEndpoint(this)
  }

  seasons (id) {
    return new SeasonsEndpoint(this, id)
  }

  standings () {
    return new StandingsEndpoint(this)
  }

  stats () {
    return new StatsEndpoint(this)
  }
}

class AmuletsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/amulets'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class GamesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/games'
    this.isPaginated = true
    this.isBulk = true
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class RanksEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/ranks'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class SeasonsEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.id = id
    this.url = '/v2/pvp/seasons'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }

  leaderboards () {
    return new SeasonLeaderboardEndpoint(this, this.id)
  }
}

class SeasonLeaderboardEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.id = id
  }

  ladder () {
    return new SeasonLeaderboardLadderEndpoint(this, this.id)
  }
}

class SeasonLeaderboardLadderEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/pvp/seasons/${id}/leaderboards/ladder`
    this.cacheTime = 5 * 60
  }

  get (region) {
    return super.get(`/${region}`, true)
  }
}

class StandingsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/standings'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class StatsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/stats'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}
