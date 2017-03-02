import AbstractEndpoint from '../endpoint'

export default class RacesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/races'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
