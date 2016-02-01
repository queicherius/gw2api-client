/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/account.js')

describe('endpoints > account', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/account', async () => {
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account')

    reqMock.addResponse({id: 'guid', name: 'Account.1234', world: 1007})
    let content = await endpoint.get()
    expect(content.name).to.equal('Account.1234')
  })

  it('test /v2/account/achievements', async () => {
    endpoint = endpoint.achievements()
    endpoint.requester = reqMock

    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/achievements')

    reqMock.addResponse([{id: 1, current: 1, max: 1000, done: false}])
    let content = await endpoint.get()
    expect(content[0].max).to.equal(1000)
  })

  it('test /v2/account/bank', async () => {
    endpoint = endpoint.bank()
    endpoint.requester = reqMock

    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/bank')

    reqMock.addResponse([null, null, {id: 123, slot: 1, count: 1}])
    let content = await endpoint.get()
    expect(content[2].id).to.equal(123)
  })

  it('test /v2/account/characters', async () => {
    endpoint = endpoint.characters()
    expect(endpoint.url).to.equal('/v2/characters')
  })

  it('test /v2/account/dyes', async () => {
    endpoint = endpoint.dyes()
    endpoint.requester = reqMock

    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/dyes')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/account/materials', async () => {
    endpoint = endpoint.materials()
    endpoint.requester = reqMock

    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/materials')

    reqMock.addResponse([{id: 123, category: 5, count: 250}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal(123)
  })

  it('test /v2/account/minis', async () => {
    endpoint = endpoint.minis()
    endpoint.requester = reqMock

    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/minis')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/account/pvp', async () => {
    endpoint = endpoint.pvp()
    expect(endpoint.games).to.exist
  })

  it('test /v2/account/skins', async () => {
    endpoint = endpoint.skins()
    endpoint.requester = reqMock

    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/skins')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/account/transactions', async () => {
    endpoint = endpoint.transactions()
    expect(endpoint.current).to.exist
  })

  it('test /v2/account/wallet', async () => {
    endpoint = endpoint.wallet()
    endpoint.requester = reqMock

    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/wallet')

    reqMock.addResponse([{id: 1, value: 1337}, {id: 2, value: 9001}])
    let content = await endpoint.get()
    expect(content[0].value).to.equal(1337)
  })
})
