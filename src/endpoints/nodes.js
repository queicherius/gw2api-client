import AbstractEndpoint from '../endpoint'

export default class NodesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/nodes'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
