const AbstractEndpoint = require('../endpoint.js')

class CharactersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/characters'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isAuthenticated = true
  }

  backstory (character) {
    return new BackstoryEndpoint(this.client, character)
  }

  core (character) {
    return new CoreEndpoint(this.client, character)
  }

  crafting (character) {
    return new CraftingEndpoint(this.client, character)
  }

  equipment (character) {
    return new EquipmentEndpoint(this.client, character)
  }

  heropoints (character) {
    return new HeropointsEndpoint(this.client, character)
  }

  inventory (character) {
    return new InventoryEndpoint(this.client, character)
  }

  recipes (character) {
    return new RecipesEndpoint(this.client, character)
  }

  specializations (character) {
    return new SpecializationsEndpoint(this.client, character)
  }

  training (character) {
    return new TrainingEndpoint(this.client, character)
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
