const AbstractEndpoint = require('../endpoint.js')

class CommerceEndpoint extends AbstractEndpoint {
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
  }

  gems (quantity) {
    return this.request(this.url + '/gems?quantity=' + quantity)
  }

  coins (quantity) {
    return this.request(this.url + '/coins?quantity=' + quantity)
  }
}

class ListingsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/commerce/listings'
    this.isBulk = true
    this.supportsBulkAll = false
  }
}

class PricesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/commerce/prices'
    this.isBulk = true
    this.supportsBulkAll = false
  }
}

class TransactionsEndpoint extends AbstractEndpoint {
  constructor (client, type, list) {
    super(client)
    this.url = '/v2/commerce/transactions/' + type + '/' + list
    this.isPaginated = true
    this.isAuthenticated = true
  }
}

module.exports = CommerceEndpoint
