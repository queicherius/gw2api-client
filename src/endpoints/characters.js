const AbstractEndpoint = require('../endpoint.js')

class CharactersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/characters'
    this.isBulk = true
    this.supportsBulkAll = false
    this.isAuthenticated = true
  }

  equipment (character) {
    return new EquipmentEndpoint(this.client, character)
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

module.exports = CharactersEndpoint
