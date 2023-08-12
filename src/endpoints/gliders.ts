import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

export class GlidersEndpoint<S extends Schema> extends AbstractEndpoint<S["Gliders"]> {
  constructor (client) {
    super(client)
    this.url = '/v2/gliders'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
