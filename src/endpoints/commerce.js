import AbstractEndpoint from '../endpoint'

export default class CommerceEndpoint extends AbstractEndpoint {
  // Current gem/coin exchange rates
  exchange () {
    return new ExchangeEndpoint(this.client)
  }

  // Current tradingpost listings
  listings () {
    return new ListingsEndpoint(this.client)
  }

  // Current tradingpost prices
  prices () {
    return new PricesEndpoint(this.client)
  }

  // Current and completed transactions
  transactions () {
    return {
      current: () => ({
        buys: () => new TransactionsEndpoint(this.client, 'current', 'buys'),
        sells: () => new TransactionsEndpoint(this.client, 'current', 'sells')
      }),
      history: () => ({
        buys: () => new TransactionsEndpoint(this.client, 'history', 'buys'),
        sells: () => new TransactionsEndpoint(this.client, 'history', 'sells')
      })
    }
  }
}

class ExchangeEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/commerce/exchange'
    this.cacheTime = 10 * 60
  }

  gems (quantity) {
    return super.get(`/gems?quantity=${quantity}`, true)
  }

  coins (quantity) {
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
    this.cacheTime = 60
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
