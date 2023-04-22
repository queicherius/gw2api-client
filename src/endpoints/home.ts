import { AbstractEndpoint } from '../endpoint'

export class HomeEndpoint extends AbstractEndpoint {
  public cats (): CatsEndpoint {
    return new CatsEndpoint(this)
  }

  public nodes (): NodesEndpoint {
    return new NodesEndpoint(this)
  }
}

class CatsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/home/cats'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}

class NodesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/home/nodes'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
