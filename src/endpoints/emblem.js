const AbstractEndpoint = require('../endpoint.js')

class EmblemEndpoint extends AbstractEndpoint {
  backgrounds () {
    return new LayersEndpoint(this.client, 'backgrounds')
  }

  foregrounds () {
    return new LayersEndpoint(this.client, 'foregrounds')
  }
}

class LayersEndpoint extends AbstractEndpoint {
  constructor (client, layer) {
    super(client)
    this.url = '/v2/emblem/' + layer
    this.isBulk = true
  }
}

module.exports = EmblemEndpoint
