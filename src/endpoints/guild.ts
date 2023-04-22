import { AbstractEndpoint } from '../endpoint'

type GuildID = string
type LogID = number

export class GuildEndpoint extends AbstractEndpoint {
  private id: GuildID

  constructor (client, id: GuildID) {
    super(client)
    this.id = id
    this.url = '/v2/guild'
    this.isAuthenticated = true
    this.isOptionallyAuthenticated = true
    this.cacheTime = 60 * 60
  }

  public get (id: GuildID) {
    return super.get(`/${id}`, true)
  }

  public permissions (): PermissionsEndpoint {
    return new PermissionsEndpoint(this)
  }

  public search (name: string): SearchEndpoint {
    // FIXME: bug? Constructor got passed `name` before (which is not received in the constructor) instead of chaining the call
    return new SearchEndpoint(this) //, name)
  }

  public upgrades (): UpgradesEndpoint | AllUpgradesEndpoint {
    if (this.id === undefined) {
      return new AllUpgradesEndpoint(this)
    }

    return new UpgradesEndpoint(this, this.id)
  }

  public log (): LogEndpoint {
    return new LogEndpoint(this, this.id)
  }

  public members (): MembersEndpoint {
    return new MembersEndpoint(this, this.id)
  }

  public ranks (): RanksEndpoint {
    return new RanksEndpoint(this, this.id)
  }

  public stash (): StashEndpoint {
    return new StashEndpoint(this, this.id)
  }

  public storage (): StorageEndpoint {
    return new StorageEndpoint(this, this.id)
  }

  public teams (): TeamsEndpoint {
    return new TeamsEndpoint(this, this.id)
  }

  public treasury (): TreasuryEndpoint {
    return new TreasuryEndpoint(this, this.id)
  }
}

class PermissionsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/permissions'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class SearchEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/search'
    this.cacheTime = 60 * 60
  }

  public name (name: string) {
    return super.get(`?name=${encodeURIComponent(name)}`, true)
      .then(result => result[0])
  }
}

class AllUpgradesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/upgrades'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class LogEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/log`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  public since (logId: LogID) {
    return super.get(`?since=${logId}`, true)
  }
}

class MembersEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/members`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class RanksEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/ranks`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class StashEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/stash`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class StorageEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/storage`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class TeamsEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/teams`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class TreasuryEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/treasury`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class UpgradesEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/upgrades`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}
