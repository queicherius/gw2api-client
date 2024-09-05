const AbstractEndpoint = require('../endpoint')
const CharactersEndpoint = require('./characters')
const PvpEndpoint = require('./pvp')
const CommerceEndpoint = require('./commerce')
const WizardsvaultEndpoint = require('./wizardsvault')
const accountBlob = require('./account-blob.js')
const resetTime = require('../helpers/resetTime')

class AccountEndpoint extends AbstractEndpoint {
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

  dailycrafting () {
    return new DailycraftingEndpoint(this)
  }

  delivery () {
    return new CommerceEndpoint(this).delivery()
  }

  dungeons () {
    return new DungeonsEndpoint(this)
  }

  dyes () {
    return new DyesEndpoint(this)
  }

  emotes () {
    return new EmotesEndpoint(this)
  }

  finishers () {
    return new FinishersEndpoint(this)
  }

  gliders () {
    return new GlidersEndpoint(this)
  }

  home () {
    return {
      cats: () => new HomeCatsEndpoint(this),
      nodes: () => new HomeNodesEndpoint(this)
    }
  }

  homestead () {
    return {
      decorations: () => new HomesteadDecorationsEndpoint(this),
      glyphs: () => new HomesteadGlyphsEndpoint(this)
    }
  }

  inventory () {
    return new InventoryEndpoint(this)
  }

  jadebots () {
    return new JadebotsEndpoint(this)
  }

  legendaryarmory () {
    return new LegendaryarmoryEndpoint(this)
  }

  luck () {
    return new LuckEndpoint(this)
  }

  mailcarriers () {
    return new MailcarriersEndpoint(this)
  }

  masteries () {
    return new MasteriesEndpoint(this)
  }

  mapchests () {
    return new MapchestsEndpoint(this)
  }

  mastery () {
    return {
      points: () => new MasteryPointsEndpoint(this)
    }
  }

  materials () {
    return new MaterialsEndpoint(this)
  }

  minis () {
    return new MinisEndpoint(this)
  }

  mounts () {
    return {
      skins: () => new MountSkinsEndpoint(this),
      types: () => new MountTypesEndpoint(this)
    }
  }

  novelties () {
    return new NoveltiesEndpoint(this)
  }

  outfits () {
    return new OutfitsEndpoint(this)
  }

  pvp () {
    return new PvpEndpoint(this, true)
  }

  raids () {
    return new RaidsEndpoint(this)
  }

  recipes () {
    return new RecipesEndpoint(this)
  }

  skiffs () {
    return new SkiffsEndpoint(this)
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

  wizardsvault () {
    return {
      listings: () => new WizardsvaultListingsEndpoint(this),
      daily: () => new WizardsvaultDailyEndpoint(this),
      weekly: () => new WizardsvaultWeeklyEndpoint(this),
      special: () => new WizardsvaultSpecialEndpoint(this)
    }
  }

  worldbosses () {
    return new WorldbossesEndpoint(this)
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
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 5 * 60
  }

  ids () {
    return Promise.reject(new Error('method not supported for this endpoint'))
  }

  get (id) {
    if (id) {
      return super.get(id)
    }

    // This endpoint returns all entries if the url gets requested
    // without any parameters, analogue to the other account endpoints
    return this.all()
  }

  all () {
    return super.get('', true)
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

class DailycraftingEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/dailycrafting'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  async get () {
    return await isStaleDailyData(this) ? [] : super.get()
  }
}

class DungeonsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/dungeons'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  async get () {
    return await isStaleDailyData(this) ? [] : super.get()
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

class EmotesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/emotes'
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

class GlidersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/gliders'
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

class HomesteadDecorationsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/homestead/decorations'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class HomesteadGlyphsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/homestead/glyphs'
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

class JadebotsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/jadebots'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class LegendaryarmoryEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/legendaryarmory'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class LuckEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/luck'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  async get () {
    const response = await super.get()
    // [API PATCH #0] If the account does not have any luck, the API erroneously returns `[]`
    if (response.length === 0) return 0
    return response[0].value
  }
}

class MailcarriersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/mailcarriers'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class MapchestsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/mapchests'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  async get () {
    return await isStaleDailyData(this) ? [] : super.get()
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

class MasteryPointsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/mastery/points'
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

class MountSkinsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/mounts/skins'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class MountTypesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/mounts/types'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class NoveltiesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/novelties'
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

  async get () {
    return await isStaleWeeklyData(this) ? [] : super.get()
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

class SkiffsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/skiffs'
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

class WorldbossesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/worldbosses'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  async get () {
    return await isStaleDailyData(this) ? [] : super.get()
  }
}

class WizardsvaultListingsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/wizardsvault/listings'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class WizardsvaultDailyEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/wizardsvault/daily'
    this.isAuthenticated = true
    this.isLocalized = true
    this.cacheTime = 5 * 60
  }

  async get () {
    const [response, isStale] = await Promise.all([
      super.get(),
      isStaleDailyData(this)
    ])

    if (isStale) {
      response.meta_progress_current = 0
      response.meta_reward_claimed = false
      response.objectives = []
    }

    return response
  }
}

class WizardsvaultWeeklyEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/wizardsvault/weekly'
    this.isAuthenticated = true
    this.isLocalized = true
    this.cacheTime = 5 * 60
  }

  async get () {
    const [response, isStale] = await Promise.all([
      super.get(),
      isStaleWeeklyData(this)
    ])

    if (isStale) {
      response.meta_progress_current = 0
      response.meta_reward_claimed = false
      response.objectives = []
    }

    return response
  }
}

class WizardsvaultSpecialEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/wizardsvault/special'
    this.isAuthenticated = true
    this.isLocalized = true
    this.cacheTime = 5 * 60
  }

  async get () {
    const season = await new WizardsvaultEndpoint(this).get()

    const [response, isStale] = await Promise.all([
      super.get(),
      isStaleData(this, new Date(season.start))
    ])

    if (isStale) {
      response.objectives = []
    }

    return response
  }
}

// Stale data can happen if the last account update was before the last daily reset
async function isStaleDailyData (endpointInstance) {
  return isStaleData(endpointInstance, resetTime.getLastDailyReset())
}

// Stale data can happen if the last account update was before the last weekly reset
async function isStaleWeeklyData (endpointInstance) {
  return isStaleData(endpointInstance, resetTime.getLastWeeklyReset())
}

async function isStaleData (endpointInstance, resetDate) {
  const account = await new AccountEndpoint(endpointInstance).schema('2019-03-26').get()
  return new Date(account.last_modified) < resetDate
}

module.exports = AccountEndpoint
