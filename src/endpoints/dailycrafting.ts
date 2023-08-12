import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

export class DailycraftingEndpoint<S extends Schema> extends AbstractEndpoint<S["Dailycrafting"]> {
  constructor (client) {
    super(client)
    this.url = '/v2/dailycrafting'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
