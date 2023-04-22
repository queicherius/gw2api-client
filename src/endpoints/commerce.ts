import { AbstractEndpoint } from '../endpoint'

export class CommerceEndpoint extends AbstractEndpoint {
  // Current things to grab in the delivery box
  public delivery () {
    return new DeliveryEndpoint(this)
  }

  // Current gem/coin exchange rates
  public exchange () {
    return new ExchangeEndpoint(this)
  }

  // Current tradingpost listings
  public listings () {
    return new ListingsEndpoint(this)
  }

  // Current tradingpost prices
  public prices () {
    return new PricesEndpoint(this)
  }

  // Current and completed transactions
  public transactions () {
    return {
      current: () => ({
        buys: () => new TransactionsEndpoint(this, 'current', 'buys'),
        sells: () => new TransactionsEndpoint(this, 'current', 'sells')
      }),
      history: () => ({
        buys: () => new TransactionsEndpoint(this, 'history', 'buys'),
        sells: () => new TransactionsEndpoint(this, 'history', 'sells')
      })
    }
  }
}

class DeliveryEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = `/v2/commerce/delivery`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

class ExchangeEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/commerce/exchange'
    this.cacheTime = 10 * 60
  }

  gems (quantity: number) {
    return super.get(`/gems?quantity=${quantity}`, true)
  }

  coins (quantity: number) {
    return super.get(`/coins?quantity=${quantity}`, true)
  }
}

class ListingsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/commerce/listings'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.cacheTime = 2 * 60
  }
}

class PricesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/commerce/prices'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.cacheTime = 60
  }
}

class TransactionsEndpoint extends AbstractEndpoint {
  constructor (client, type, list) {
    super(client)
    this.url = `/v2/commerce/transactions/${type}/${list}`
    this.isPaginated = true
    this.isAuthenticated = true
    this.cacheTime = 10 * 60
  }
}
