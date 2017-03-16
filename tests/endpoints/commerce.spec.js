/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/commerce'

describe('endpoints > commerce', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/commerce/exchange (coins)', async () => {
    endpoint = endpoint.exchange()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/commerce/exchange')

    fetchMock.addResponse({coins_per_gem: 2000, quantity: 5})
    let content = await endpoint.coins(10000)
    expect(content.quantity).to.equal(5)
    expect(fetchMock.lastUrl()).contains('/v2/commerce/exchange/coins?quantity=10000')
  })

  it('test /v2/commerce/exchange (gems)', async () => {
    endpoint = endpoint.exchange()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/commerce/exchange')

    fetchMock.addResponse({coins_per_gem: 1269, quantity: 12345})
    let content = await endpoint.gems(10000)
    expect(content.quantity).to.equal(12345)
    expect(fetchMock.lastUrl()).contains('/v2/commerce/exchange/gems?quantity=10000')
  })

  it('test /v2/commerce/listings', async () => {
    endpoint = endpoint.listings()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/commerce/listings')

    fetchMock.addResponse({id: 12, buys: [{listings: 1, unit_price: 123, quantity: 123}]})
    let content = await endpoint.get(12)
    expect(content.id).to.equal(12)
  })

  it('test /v2/commerce/prices', async () => {
    endpoint = endpoint.prices()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/commerce/prices')

    fetchMock.addResponse({id: 12, buys: {quantity: 12345, unit_price: 123}})
    let content = await endpoint.get(12)
    expect(content.id).to.equal(12)
  })

  it('test /v2/commerce/transactions/current/buys', async () => {
    endpoint = endpoint.transactions().current().buys()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/commerce/transactions/current/buys')

    fetchMock.addResponse([{id: 1337, item_id: 123, price: 987, quantity: 20}])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).to.equal(123)
  })

  it('test /v2/commerce/transactions/current/sells', async () => {
    endpoint = endpoint.transactions().current().sells()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/commerce/transactions/current/sells')

    fetchMock.addResponse([{id: 1337, item_id: 123, price: 987, quantity: 20}])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).to.equal(123)
  })

  it('test /v2/commerce/transactions/history/buys', async () => {
    endpoint = endpoint.transactions().history().buys()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/commerce/transactions/history/buys')

    fetchMock.addResponse([{id: 1337, item_id: 123, price: 987, quantity: 20}])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).to.equal(123)
  })

  it('test /v2/commerce/transactions/history/sells', async () => {
    endpoint = endpoint.transactions().history().sells()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/commerce/transactions/history/sells')

    fetchMock.addResponse([{id: 1337, item_id: 123, price: 987, quantity: 20}])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).to.equal(123)
  })
})
