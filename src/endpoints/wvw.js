import AbstractEndpoint from '../endpoint'

export default class WvwEndpoint extends AbstractEndpoint {
  abilities () {
    return new AbilitiesEndpoint(this)
  }

  matches () {
    return new MatchesEndpoint(this)
  }

  objectives () {
    return new ObjectivesEndpoint(this)
  }

  upgrades () {
    return new UpgradesEndpoint(this)
  }

  ranks () {
    return new RanksEndpoint(this)
  }
}

class AbilitiesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/abilities'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class MatchesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/matches'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 30
  }

  world (worldId) {
    return super.get(`?world=${worldId}`, true);
  }

  overview () {
    return new MatchesOverviewEndpoint(this)
  }

  scores () {
    return new MatchesScoresEndpoint(this)
  }

  stats () {
    return new MatchesStatsEndpoint(this)
  }
}

class MatchesOverviewEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/matches/overview'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 30
  }

  world (worldId) {
    return super.get(`?world=${worldId}`, true);
  }
}

class MatchesScoresEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/matches/scores'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 30
  }

  world (worldId) {
    return super.get(`?world=${worldId}`, true);
  }
}

class MatchesStatsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/matches/stats'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 30
  }

  world (worldId) {
    return super.get(`?world=${worldId}`, true);
  }
}

class ObjectivesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/objectives'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class UpgradesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/upgrades'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class RanksEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/ranks'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
