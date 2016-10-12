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
    return new BackstoryEndpoint(this.client, this.name)
  }

  core () {
    return new CoreEndpoint(this.client, this.name)
  }

  crafting () {
    return new CraftingEndpoint(this.client, this.name)
  }

  equipment () {
    return new EquipmentEndpoint(this.client, this.name)
  }

  heropoints () {
    return new HeropointsEndpoint(this.client, this.name)
  }

  inventory () {
    return new InventoryEndpoint(this.client, this.name)
  }

  recipes () {
    return new RecipesEndpoint(this.client, this.name)
  }

  specializations () {
    return new SpecializationsEndpoint(this.client, this.name)
  }

  training () {
    return new TrainingEndpoint(this.client, this.name)
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
