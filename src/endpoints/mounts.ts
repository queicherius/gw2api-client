import { AbstractEndpoint } from '../endpoint'

export class MountsEndpoint extends AbstractEndpoint {
  public skins (): SkinsEndpoint {
    return new SkinsEndpoint(this)
  }

  public types (): TypesEndpoint {
    return new TypesEndpoint(this)
  }
}

class SkinsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/mounts/skins'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class TypesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/mounts/types'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
