import { AbstractEndpoint } from '../endpoint'

export class WvwEndpoint extends AbstractEndpoint {
  public abilities (): AbilitiesEndpoint {
    return new AbilitiesEndpoint(this)
  }

  public matches (): MatchesEndpoint {
    return new MatchesEndpoint(this)
  }

  public objectives (): ObjectivesEndpoint {
    return new ObjectivesEndpoint(this)
  }

  public upgrades (): UpgradesEndpoint {
    return new UpgradesEndpoint(this)
  }

  public ranks (): RanksEndpoint {
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

interface World {}

class MatchesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/matches'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 30
  }

  world (worldId: number): World {
    return super.get<World>(`?world=${worldId}`, true)
  }

  overview () {
    return new MatchesOverviewEndpoint(this)
  }

  scores () {
    return new MatchesScoresEndpoint(this)
  }

  stats (id) {
    return new MatchesStatsEndpoint(this, id)
  }
}

class TeamsEndpoint extends AbstractEndpoint {
  private team
  private id

  constructor (client, id, team) {
    super(client)
    this.team = team
    this.id = id
    this.url = `/v2/wvw/matches/stats/${id}/teams`
  }

  public top (which): TopStatsEndpoint {
    return new TopStatsEndpoint(this, this.id, this.team, which)
  }
}

class TopStatsEndpoint extends AbstractEndpoint {
  private which

  constructor (client, id, team, which) {
    super(client)
    this.which = which
    this.url = `/v2/wvw/matches/stats/${id}/teams/${team}/top/${which}`
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

  public world (worldId): Promise<World> {
    return super.get<World>(`?world=${worldId}`, true)
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
    return super.get(`?world=${worldId}`, true)
  }
}

class MatchesStatsEndpoint extends AbstractEndpoint {
  private id

  constructor (client, id) {
    super(client)
    this.id = id
    this.url = '/v2/wvw/matches/stats'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 30
  }

  world (worldId) {
    return super.get(`?world=${worldId}`, true)
  }

  teams (team) {
    return new TeamsEndpoint(this, this.id, team)
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
