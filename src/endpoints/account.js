import AbstractEndpoint from '../endpoint'
import CharactersEndpoint from './characters'
import PvpEndpoint from './pvp'
import CommerceEndpoint from './commerce'
import accountBlob from './account-blob.js'

export default class AccountEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  achievements () {
    return new AchievementsEndpoint(this)
  }

  bank () {
    return new BankEndpoint(this)
  }

  characters (name) {
    return new CharactersEndpoint(this, name)
  }

  dungeons () {
    return new DungeonsEndpoint(this)
  }

  dyes () {
    return new DyesEndpoint(this)
  }

  finishers () {
    return new FinishersEndpoint(this)
  }

  home () {
    return {
      cats: () => new HomeCatsEndpoint(this),
      nodes: () => new HomeNodesEndpoint(this)
    }
  }

  inventory () {
    return new InventoryEndpoint(this)
  }

  masteries () {
    return new MasteriesEndpoint(this)
  }

  materials () {
    return new MaterialsEndpoint(this)
  }

  minis () {
    return new MinisEndpoint(this)
  }

  outfits () {
    return new OutfitsEndpoint(this)
  }

  pvp () {
    return new PvpEndpoint(this)
  }

  raids () {
    return new RaidsEndpoint(this)
  }

  recipes () {
    return new RecipesEndpoint(this)
  }

  skins () {
    return new SkinsEndpoint(this)
  }

  titles () {
    return new TitlesEndpoint(this)
  }

  transactions () {
    return new CommerceEndpoint(this).transactions()
  }

  wallet () {
    return new WalletEndpoint(this)
  }

  // All data available for the account in a single object
  blob () {
    return accountBlob(this)
  }
}

class AchievementsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/achievements'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class BankEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/bank'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class DungeonsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/dungeons'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class DyesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/dyes'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class FinishersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/finishers'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class HomeCatsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/home/cats'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class HomeNodesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/home/nodes'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class InventoryEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/inventory'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class MasteriesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/masteries'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class MaterialsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/materials'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class MinisEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/minis'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class OutfitsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/outfits'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class RaidsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/raids'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class RecipesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/recipes'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class SkinsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/skins'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class TitlesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/titles'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class WalletEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/wallet'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}
