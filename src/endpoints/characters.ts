import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

export class CharactersEndpoint<S extends Schema> extends AbstractEndpoint<S["Achievements"]> {
  public name: string

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

  equipment () {
    return new EquipmentEndpoint(this, this.name)
  }

  heropoints () {
    return new HeropointsEndpoint(this, this.name)
  }

  inventory () {
    return new InventoryEndpoint(this, this.name)
  }

  quests () {
    return new QuestsEndpoint(this, this.name)
  }

  recipes () {
    return new RecipesEndpoint(this, this.name)
  }

  sab () {
    return new SabEndpoint(this, this.name)
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

class QuestsEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/quests`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
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

class SabEndpoint extends AbstractEndpoint {
  constructor (client, character) {
    super(client)
    this.url = `/v2/characters/${encodeURIComponent(character)}/sab`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
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
