import AbstractEndpoint from '../endpoint'

export default class BuildEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/build'
  }

  get () {
    return this.request(this.url).then(result => result.id)
  }
}
