import { AbstractEndpoint } from '../endpoint'

export class ContinentsEndpoint extends AbstractEndpoint<Continent> {
  constructor (client) {
    super(client)
    this.url = '/v2/continents'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }

  floors (id: FloorID) {
    return new FloorsEndpoint(this, id)
  }
}

class FloorsEndpoint extends AbstractEndpoint<Floor> {
  constructor (client, continentId) {
    super(client)
    this.url = `/v2/continents/${continentId}/floors`
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
