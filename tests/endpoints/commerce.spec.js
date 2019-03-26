/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/commerce')

describe('endpoints > commerce', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
    endpoint.schema('schema')
  })

  it('test /v2/commerce/delivery', async () => {
    endpoint = endpoint.delivery()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/delivery')

    fetchMock.addResponse({
      coins: 2280,
      items: [
        { id: 49424, count: 14 },
        { id: 24358, count: 1 }
      ]
    })

    let content = await endpoint.get()
    expect(content.coins).toEqual(2280)
    expect(content.items.length).toEqual(2)
  })

  it('test /v2/commerce/exchange (coins)', async () => {
    endpoint = endpoint.exchange()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/exchange')

    fetchMock.addResponse({ coins_per_gem: 2000, quantity: 5 })
    let content = await endpoint.coins(10000)
    expect(content.quantity).toEqual(5)
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/commerce/exchange/coins?v=schema&quantity=10000'))
  })

  it('test /v2/commerce/exchange (gems)', async () => {
    endpoint = endpoint.exchange()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/exchange')

    fetchMock.addResponse({ coins_per_gem: 1269, quantity: 12345 })
    let content = await endpoint.gems(10000)
    expect(content.quantity).toEqual(12345)
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/commerce/exchange/gems?v=schema&quantity=10000'))
  })

  it('test /v2/commerce/listings', async () => {
    endpoint = endpoint.listings()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/listings')

    fetchMock.addResponse({ id: 12, buys: [{ listings: 1, unit_price: 123, quantity: 123 }] })
    let content = await endpoint.get(12)
    expect(content.id).toEqual(12)
  })

  it('test /v2/commerce/prices', async () => {
    endpoint = endpoint.prices()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/prices')

    fetchMock.addResponse({ id: 12, buys: { quantity: 12345, unit_price: 123 } })
    let content = await endpoint.get(12)
    expect(content.id).toEqual(12)
  })

  it('test /v2/commerce/transactions/current/buys', async () => {
    endpoint = endpoint.transactions().current().buys()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/transactions/current/buys')

    fetchMock.addResponse([{ id: 1337, item_id: 123, price: 987, quantity: 20 }])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).toEqual(123)
  })

  it('test /v2/commerce/transactions/current/sells', async () => {
    endpoint = endpoint.transactions().current().sells()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/transactions/current/sells')

    fetchMock.addResponse([{ id: 1337, item_id: 123, price: 987, quantity: 20 }])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).toEqual(123)
  })

  it('test /v2/commerce/transactions/history/buys', async () => {
    endpoint = endpoint.transactions().history().buys()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/transactions/history/buys')

    fetchMock.addResponse([{ id: 1337, item_id: 123, price: 987, quantity: 20 }])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).toEqual(123)
  })

  it('test /v2/commerce/transactions/history/sells', async () => {
    endpoint = endpoint.transactions().history().sells()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/commerce/transactions/history/sells')

    fetchMock.addResponse([{ id: 1337, item_id: 123, price: 987, quantity: 20 }])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).toEqual(123)
  })
})
