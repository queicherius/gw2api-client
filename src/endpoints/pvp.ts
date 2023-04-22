import { AbstractEndpoint } from '../endpoint'


type SeasonID = string
type Region = 'na' | 'eu'
type Board =  'guild' | 'legendary'

export class PvpEndpoint extends AbstractEndpoint {
  private fromAccount: boolean

  constructor (client, fromAccount: boolean) {
    super(client)
    this.fromAccount = fromAccount
  }

  amulets () {
    return new AmuletsEndpoint(this)
  }

  games () {
    return new GamesEndpoint(this)
  }

  heroes () {
    if (this.fromAccount) {
      return new AccountHeroesEndpoint(this)
    }

    return new HeroesEndpoint(this)
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

class AccountHeroesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/pvp/heroes'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
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

class HeroesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/heroes'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
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
  private id: SeasonID

  constructor (client, id: SeasonID) {
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
  private id: SeasonID

  constructor (client, id: SeasonID) {
    super(client)
    this.id = id
    this.url = `/v2/pvp/seasons/${id}/leaderboards`
    this.cacheTime = 24 * 60 * 60
  }

  public ids () {
    return super.get('', true)
  }

  public board (board, region) {
    return new SeasonLeaderboardBoardEndpoint(this, this.id, board, region)
  }
}

class SeasonLeaderboardBoardEndpoint extends AbstractEndpoint {
  constructor (client, id: SeasonID, board: Board, region: Region) {
    super(client)
    this.url = `/v2/pvp/seasons/${id}/leaderboards/${board}/${region}`
    this.isPaginated = true
    this.cacheTime = 5 * 60
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
