import AbstractEndpoint from '../endpoint'

export default class ColorsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/colors'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}
