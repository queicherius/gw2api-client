import AbstractEndpoint from '../endpoint'

export default class EmblemEndpoint extends AbstractEndpoint {
  backgrounds () {
    return new LayersEndpoint(this, 'backgrounds')
  }

  foregrounds () {
    return new LayersEndpoint(this, 'foregrounds')
  }
}

class LayersEndpoint extends AbstractEndpoint {
  constructor (client, layer) {
    super(client)
    this.url = `/v2/emblem/${layer}`
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
