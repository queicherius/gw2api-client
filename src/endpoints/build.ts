import { AbstractEndpoint } from '../endpoint'

export class BuildEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/build'
    this.cacheTime = 60
  }

  get () {
    return super.get().then(result => result.id)
  }
}
