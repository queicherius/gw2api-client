import { AbstractEndpoint } from '../endpoint'

type FloorID = number

export class ContinentsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/continents'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }

  public floors (id: FloorID): FloorsEndpoint {
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
