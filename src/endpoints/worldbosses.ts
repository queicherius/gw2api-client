import { AbstractEndpoint } from '../endpoint'

export class WorldbossesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/worldbosses'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
