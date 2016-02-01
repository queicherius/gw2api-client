const AbstractEndpoint = require('../endpoint.js')

class AccountEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }

  achievements () {
    return new AchievementsEndpoint(this.client)
  }

  bank () {
    return new BankEndpoint(this.client)
  }

  characters () {
    return new (require('./characters.js'))(this.client)
  }

  dyes () {
    return new DyesEndpoint(this.client)
  }

  materials () {
    return new MaterialsEndpoint(this.client)

  }

  minis () {
    return new MinisEndpoint(this.client)

  }

  pvp () {
    return new (require('./pvp.js'))(this.client)
  }

  skins () {
    return new SkinsEndpoint(this.client)
  }

  transactions () {
    return new (require('./commerce.js'))(this.client).transactions()
  }

  wallet () {
    return new WalletEndpoint(this.client)
  }
}

class AchievementsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/achievements'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }
}

class BankEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/bank'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }
}

class DyesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/dyes'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }
}

class MaterialsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/materials'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }
}

class MinisEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/minis'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }
}

class SkinsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/skins'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }
}

class WalletEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/wallet'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }
}

module.exports = AccountEndpoint
