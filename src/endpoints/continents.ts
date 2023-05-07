import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

export class ContinentsEndpoint<S extends Schema> extends AbstractEndpoint<S["Continents"]> {
  constructor (client) {
    super(client)
    this.url = '/v2/continents'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }

  floors (id: number) {
    return new FloorsEndpoint(this, id)
  }
}

class FloorsEndpoint<S extends Schema> extends AbstractEndpoint<S["Floor"]> {
  constructor (client, continentId) {
    super(client)
    this.url = `/v2/continents/${continentId}/floors`
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
