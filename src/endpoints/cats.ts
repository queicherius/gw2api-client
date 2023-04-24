import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

export class CatsEndpoint<S extends Schema> extends AbstractEndpoint<S["Cats"]> {
  constructor (client) {
    super(client)
    this.url = '/v2/cats'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
