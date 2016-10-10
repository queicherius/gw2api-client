import AbstractEndpoint from '../endpoint'

export default class MapsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/maps'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
  }
}
