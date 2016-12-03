import AbstractEndpoint from '../endpoint'

export default class ContinentsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/continents'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }

  floors (id) {
    return new FloorsEndpoint(this, id)
  }
}

class FloorsEndpoint extends AbstractEndpoint {
  constructor (client, continentId) {
    super(client)
    this.url = `/v2/continents/${continentId}/floors`
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
