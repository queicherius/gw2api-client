import AbstractEndpoint from '../endpoint'

export default class ItemsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/items'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
