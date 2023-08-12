import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

export class DungeonsEndpoint<S extends Schema> extends AbstractEndpoint<S["Dungeons"]> {
  constructor (client) {
    super(client)
    this.url = '/v2/dungeons'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}