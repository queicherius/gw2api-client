/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/commerce.js')

describe('endpoints > commerce', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/commerce/exchange (coins)', async () => {
    endpoint = endpoint.exchange()
    endpoint.requester = reqMock

    expect(endpoint.url).to.equal('/v2/commerce/exchange')

    reqMock.addResponse({coins_per_gem: 2000, quantity: 5})
    let content = await endpoint.coins(10000)
    expect(content.quantity).to.equal(5)
  })

  it('test /v2/commerce/exchange (gems)', async () => {
    endpoint = endpoint.exchange()
    endpoint.requester = reqMock

    expect(endpoint.url).to.equal('/v2/commerce/exchange')

    reqMock.addResponse({coins_per_gem: 1269, quantity: 12345})
    let content = await endpoint.gems(10000)
    expect(content.quantity).to.equal(12345)
  })

  it('test /v2/commerce/listings', async () => {
    endpoint = endpoint.listings()
    endpoint.requester = reqMock

    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.url).to.equal('/v2/commerce/listings')

    reqMock.addResponse({id: 12, buys: [{listings: 1, unit_price: 123, quantity: 123}]})
    let content = await endpoint.get(12)
    expect(content.id).to.equal(12)
  })

  it('test /v2/commerce/prices', async () => {
    endpoint = endpoint.prices()
    endpoint.requester = reqMock

    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.url).to.equal('/v2/commerce/prices')

    reqMock.addResponse({id: 12, buys: {quantity: 12345, unit_price: 123}})
    let content = await endpoint.get(12)
    expect(content.id).to.equal(12)
  })

  it('test /v2/commerce/transactions/current/buys', async () => {
    endpoint = endpoint.transactions().current().buys()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/commerce/transactions/current/buys')

    reqMock.addResponse([{id: 1337, item_id: 123, price: 987, quantity: 20}])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).to.equal(123)
  })

  it('test /v2/commerce/transactions/current/sells', async () => {
    endpoint = endpoint.transactions().current().sells()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/commerce/transactions/current/sells')

    reqMock.addResponse([{id: 1337, item_id: 123, price: 987, quantity: 20}])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).to.equal(123)
  })

  it('test /v2/commerce/transactions/history/buys', async () => {
    endpoint = endpoint.transactions().history().buys()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/commerce/transactions/history/buys')

    reqMock.addResponse([{id: 1337, item_id: 123, price: 987, quantity: 20}])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).to.equal(123)
  })

  it('test /v2/commerce/transactions/history/sells', async () => {
    endpoint = endpoint.transactions().history().sells()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/commerce/transactions/history/sells')

    reqMock.addResponse([{id: 1337, item_id: 123, price: 987, quantity: 20}])
    let content = await endpoint.page(0, 1)
    expect(content[0].item_id).to.equal(123)
  })
})
