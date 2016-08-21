const AbstractEndpoint = require('../endpoint.js')

class GuildEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild'
    this.isAuthenticated = true
    this.isOptionallyAuthenticated = true
  }

  permissions () {
    return new PermissionsEndpoint(this.client)
  }

  search (name) {
    return new SearchEndpoint(this.client, name)
  }

  upgrades (id) {
    if (id === undefined) {
      return new AllUpgradesEndpoint(this.client)
    }

    return new UpgradesEndpoint(this.client, id)
  }

  log (id) {
    return new LogEndpoint(this.client, id)
  }

  members (id) {
    return new MembersEndpoint(this.client, id)
  }

  ranks (id) {
    return new RanksEndpoint(this.client, id)
  }

  stash (id) {
    return new StashEndpoint(this.client, id)
  }

  teams (id) {
    return new TeamsEndpoint(this.client, id)
  }

  treasury (id) {
    return new TreasuryEndpoint(this.client, id)
  }
}

class PermissionsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/permissions'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

class SearchEndpoint extends AbstractEndpoint {
  constructor (client, name) {
    super(client)
    this.url = '/v2/guild/search?name=' + encodeURIComponent(name)
  }

  async get () {
    return (await this.request(this.url))[0]
  }
}

class AllUpgradesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/upgrades'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

class LogEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/log'
    this.isAuthenticated = true
  }
}

class MembersEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/members'
    this.isAuthenticated = true
  }
}

class RanksEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/ranks'
    this.isAuthenticated = true
  }
}

class StashEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/stash'
    this.isAuthenticated = true
  }
}

class TeamsEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/teams'
    this.isAuthenticated = true
  }
}

class TreasuryEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/treasury'
    this.isAuthenticated = true
  }
}

class UpgradesEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/upgrades'
    this.isAuthenticated = true
  }
}

module.exports = GuildEndpoint
