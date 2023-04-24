import { AbstractEndpoint } from '../endpoint'
import { URL } from '../types'

interface Currency {
  id: number,
  string: string,
  description: string,
  icon: URL,
  order: number
}

export class CurrenciesEndpoint extends AbstractEndpoint<Currency> {
  constructor (client) {
    super(client)
    this.url = '/v2/currencies'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
