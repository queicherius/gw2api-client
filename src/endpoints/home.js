const AbstractEndpoint = require('../endpoint')

module.exports = class HomeEndpoint extends AbstractEndpoint {
  cats () {
    return new CatsEndpoint(this)
  }

  nodes () {
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
