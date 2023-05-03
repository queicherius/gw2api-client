import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

export class ColorsEndpoint<S extends Schema> extends AbstractEndpoint<S["Colors"]> {
  constructor (client) {
    super(client)
    this.url = '/v2/colors'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
