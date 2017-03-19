import AbstractEndpoint from '../endpoint'

export default class CharactersEndpoint extends AbstractEndpoint {
  constructor (client, name) {
    super(client)
    this.name = name
    this.url = '/v2/characters'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  backstory () {
    return new BackstoryEndpoint(this, this.name)
  }

  core () {
    return new CoreEndpoint(this, this.name)
  }

  crafting () {
    return new CraftingEndpoint(this, this.name)
  }

  dungeons () {
    return new DungeonsEndpoint(this, this.name)
  }

  equipment () {
    return new EquipmentEndpoint(this, this.name)
  }

  heropoints () {
    return new HeropointsEndpoint(this, this.name)
  }

  inventory () {
    return new InventoryEndpoint(this, this.name)
  }

  recipes () {
    return new RecipesEndpoint(this, this.name)
  }

  skills () {
    return new SkillsEndpoint(this, this.name)
  }

  specializations () {
    return new SpecializationsEndpoint(this, this.name)
  }

  training () {
    return new TrainingEndpoint(this, this.name)
  }
}

class BackstoryEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/backstory`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.backstory)
  }
}

class CoreEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/core`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class CraftingEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/crafting`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.crafting)
  }
}

class DungeonsEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/dungeons`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.dungeons)
  }
}

class EquipmentEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/equipment`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.equipment)
  }
}

class HeropointsEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/heropoints`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class InventoryEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/inventory`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.bags)
  }
}

class RecipesEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/recipes`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.recipes)
  }
}

class SkillsEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/skills`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.skills)
  }
}

class SpecializationsEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/specializations`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.specializations)
  }
}

class TrainingEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/training`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  get () {
    return super.get().then(result => result.training)
  }
}
