import { AbstractEndpoint } from '../endpoint'

export class MapchestsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/mapchests'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
