import { AbstractEndpoint } from '../endpoint'

type Team = 'red' | 'blue' | 'green'
type Top = 'kills' | 'kdr'

namespace NA {
  export type MatchupID = '1-1' | '1-2' | '1-3' | '1-4'
  export enum WorldID {
    AnvilRock =           1001,
    BorlisPass =          1002,
    YaksBend =            1003,
    HengeOfDenravi =      1004,
    Maguuma =             1005,
    SorrowsFurnace =      1006,
    GateOfMadness =       1007,
    JadeQuarry =          1008,
    FortAspendWood =      1009,
    EhmryBay =            1010,
    StormbluffIsle =      1011,
    Darkhaven =           1012,
    SanctumOfRall =       1013,
    CrystalDesert =       1014,
    IsleOfJanthir =       1015,
    SeaOfSorrows =        1016,
    TarnishedCoast =      1017,
    NorthernShiverpeaks = 1018,
    Blackgate =           1019,
    FergusonsCrossing =   1020,
    Dragonbrand =         1021,
    Kaineng =             1022,
    DevonasRest =         1023,
    EredonsTerrace =      1024
  } 
}

namespace EU {
  export type MatchupID = '2-1' | '2-2' | '2-3' | '2-4'
  export enum WorldID {
    FissureOfWoe =   2001,
    Desolation =     2002,
    Gandara =        2003,
    Blacktide =      2004,
    RingOfFire =     2005,
    Underworld =     2006,
    FarShiverpeaks = 2007,
    WhitesideRidge = 2008,
    RuinsOfSurmia =  2009,
    SeafarersRest =  2010,
    Vabbi =          2011,
    PikenSquare =    2012,
    AuroraGlade =    2013,
    GunnarsHold =    2014,
    JadeSea =        2101,
    FortRanik =      2102,
    AuguryRock =     2103,
    VizunahSquare =  2104,
    Arborstone =     2105,
    Kodash =         2201,
    Riverside =      2202,
    ElonaReach =     2203,
    AbaddonsMouth =  2204,
    DrakkarLake =    2205,
    MillersSound =   2206,
    Dzagonur =       2207,
    BaruchBay =      2301
  }
}

type MatchupID = NA.MatchupID | EU.MatchupID
type WorldID = NA.WorldID | EU.WorldID



export class WvwEndpoint extends AbstractEndpoint {
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

interface World {}

class MatchesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wvw/matches'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 30
  }

  world (worldId: WorldID): World {
    return super.get<World>(`?world=${worldId}`, true)
  }

  overview () {
    return new MatchesOverviewEndpoint(this)
  }

  scores () {
    return new MatchesScoresEndpoint(this)
  }

  stats (id: MatchupID) {
    return new MatchesStatsEndpoint(this, id)
  }
}

class TeamsEndpoint extends AbstractEndpoint {
  private team: Team
  private id: MatchupID

  constructor (client, id: MatchupID, team: Team) {
    super(client)
    this.team = team
    this.id = id
    this.url = `/v2/wvw/matches/stats/${id}/teams`
  }

  top (which: Top) {
    return new TopStatsEndpoint(this, this.id, this.team, which)
  }
}

class TopStatsEndpoint extends AbstractEndpoint {
  private which: Top

  constructor (client, id: MatchupID, team: Team, which: Top) {
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

  public world (worldId: WorldID): Promise<World> {
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

  public world (worldId: WorldID) {
    return super.get(`?world=${worldId}`, true)
  }
}

class MatchesStatsEndpoint extends AbstractEndpoint {
  private id: MatchupID

  constructor (client, id: MatchupID) {
    super(client)
    this.id = id
    this.url = '/v2/wvw/matches/stats'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 30
  }

  public world (worldId: WorldID) {
    return super.get(`?world=${worldId}`, true)
  }

  public teams (team: Team) {
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
