import AbstractEndpoint from '../endpoint'

export default class LegendsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/legends'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
