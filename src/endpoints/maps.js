import AbstractEndpoint from '../endpoint'

export default class MapsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/maps'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
