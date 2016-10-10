import AbstractEndpoint from '../endpoint'
import CharactersEndpoint from './characters'
import PvpEndpoint from './pvp'
import CommerceEndpoint from './commerce'

export default class AccountEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account'
    this.isAuthenticated = true
  }

  achievements () {
    return new AchievementsEndpoint(this.client)
  }

  bank () {
    return new BankEndpoint(this.client)
  }

  characters (name) {
    return new CharactersEndpoint(this.client, name)
  }

  dyes () {
    return new DyesEndpoint(this.client)
  }

  finishers () {
    return new FinishersEndpoint(this.client)
  }

  inventory () {
    return new InventoryEndpoint(this.client)
  }

  masteries () {
    return new MasteriesEndpoint(this.client)
  }

  materials () {
    return new MaterialsEndpoint(this.client)
  }

  minis () {
    return new MinisEndpoint(this.client)
  }

  outfits () {
    return new OutfitsEndpoint(this.client)
  }

  pvp () {
    return new PvpEndpoint(this.client)
  }

  recipes () {
    return new RecipesEndpoint(this.client)
  }

  skins () {
    return new SkinsEndpoint(this.client)
  }

  titles () {
    return new TitlesEndpoint(this.client)
  }

  transactions () {
    return new CommerceEndpoint(this.client).transactions()
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
}

class BankEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/bank'
    this.isAuthenticated = true
  }
}

class DyesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/dyes'
    this.isAuthenticated = true
  }
}

class FinishersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/finishers'
    this.isAuthenticated = true
  }
}

class InventoryEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/inventory'
    this.isAuthenticated = true
  }
}

class MasteriesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/masteries'
    this.isAuthenticated = true
  }
}

class MaterialsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/materials'
    this.isAuthenticated = true
  }
}

class MinisEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/minis'
    this.isAuthenticated = true
  }
}

class OutfitsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/outfits'
    this.isAuthenticated = true
  }
}

class RecipesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/recipes'
    this.isAuthenticated = true
  }
}

class SkinsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/skins'
    this.isAuthenticated = true
  }
}

class TitlesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/titles'
    this.isAuthenticated = true
  }
}

class WalletEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/wallet'
    this.isAuthenticated = true
  }
}
