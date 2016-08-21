const AbstractEndpoint = require('../endpoint.js')

class CharactersEndpoint extends AbstractEndpoint {
  constructor (client, name) {
    super(client)
    this.name = name
    this.url = '/v2/characters'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isAuthenticated = true
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
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/backstory'
    this.isAuthenticated = true
  }

  async get () {
    return (await this.request(this.url)).backstory
  }
}

class CoreEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/core'
    this.isAuthenticated = true
  }
}

class CraftingEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/crafting'
    this.isAuthenticated = true
  }

  async get () {
    return (await this.request(this.url)).crafting
  }
}

class EquipmentEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/equipment'
    this.isAuthenticated = true
  }

  async get () {
    return (await this.request(this.url)).equipment
  }
}

class HeropointsEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/heropoints'
    this.isAuthenticated = true
  }
}

class InventoryEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/inventory'
    this.isAuthenticated = true
  }

  async get () {
    return (await this.request(this.url)).bags
  }
}

class RecipesEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/recipes'
    this.isAuthenticated = true
  }

  async get () {
    return (await this.request(this.url)).recipes
  }
}

class SpecializationsEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/specializations'
    this.isAuthenticated = true
  }

  async get () {
    return (await this.request(this.url)).specializations
  }
}

class TrainingEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = '/v2/characters/' + encodeURIComponent(character) + '/training'
    this.isAuthenticated = true
  }

  async get () {
    return (await this.request(this.url)).training
  }
}

module.exports = CharactersEndpoint
