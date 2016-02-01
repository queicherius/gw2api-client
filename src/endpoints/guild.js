const AbstractEndpoint = require('../endpoint.js')

class GuildEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v1/guild_details.json'
  }

  async get (id) {
    return this.request(this.url + '?guild_id=' + id)
  }

  upgrades () {
    return new UpgradesEndpoint(this.client)
  }

  permissions () {
    return new PermissionsEndpoint(this.client)
  }

  ranks (id) {
    return new RanksEndpoint(this.client, id)
  }

  members (id) {
    return new MembersEndpoint(this.client, id)
  }

  treasury (id) {
    return new TreasuryEndpoint(this.client, id)
  }

  stash (id) {
    return new StashEndpoint(this.client, id)
  }
}

class UpgradesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/upgrades'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
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

class RanksEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/ranks'
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

class TreasuryEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = '/v2/guild/' + encodeURIComponent(id) + '/treasury'
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

module.exports = GuildEndpoint
