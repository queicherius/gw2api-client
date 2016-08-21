/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('gw2e-requester/mock')

const Module = require('../../src/endpoints/account.js')

describe('endpoints > account', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/account', async () => {
    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account')

    reqMock.addResponse({id: 'unique-identifier', name: 'Account.1234', world: 1007})
    let content = await endpoint.get()
    expect(content.name).to.equal('Account.1234')
  })

  it('test /v2/account/achievements', async () => {
    endpoint = endpoint.achievements()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/achievements')

    reqMock.addResponse([{id: 1, current: 487, max: 1000, done: false}])
    let content = await endpoint.get()
    expect(content[0].current).to.equal(487)
  })

  it('test /v2/account/bank', async () => {
    endpoint = endpoint.bank()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/bank')

    reqMock.addResponse([null, null, {id: 123, count: 1}])
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

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/dyes')

    reqMock.addResponse([2, 3, 4])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4])
  })

  it('test /v2/account/finishers', async () => {
    endpoint = endpoint.finishers()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/finishers')

    reqMock.addResponse([2, 3, 4])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4])
  })

  it('test /v2/account/inventory', async () => {
    endpoint = endpoint.inventory()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/inventory')

    reqMock.addResponse([
      {id: 49308, count: 1, binding: 'Account'},
      {id: 48931, count: 1, binding: 'Account'}
    ])
    let content = await endpoint.get()
    expect(content).to.deep.equal([
      {id: 49308, count: 1, binding: 'Account'},
      {id: 48931, count: 1, binding: 'Account'}
    ])
  })

  it('test /v2/account/masteries', async () => {
    endpoint = endpoint.masteries()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/masteries')

    reqMock.addResponse([{id: 1, level: 4}, {id: 2, level: 5}])
    let content = await endpoint.get()
    expect(content).to.deep.equal([{id: 1, level: 4}, {id: 2, level: 5}])
  })

  it('test /v2/account/materials', async () => {
    endpoint = endpoint.materials()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/materials')

    reqMock.addResponse([{id: 12134, category: 5, count: 2}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal(12134)
  })

  it('test /v2/account/minis', async () => {
    endpoint = endpoint.minis()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/minis')

    reqMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4, 5])
  })

  it('test /v2/account/outfits', async () => {
    endpoint = endpoint.outfits()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/outfits')

    reqMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4, 5])
  })

  it('test /v2/account/pvp', async () => {
    endpoint = endpoint.pvp()
    expect(endpoint.games).to.exist
  })

  it('test /v2/account/recipes', async () => {
    endpoint = endpoint.recipes()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/recipes')

    reqMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4, 5])
  })

  it('test /v2/account/skins', async () => {
    endpoint = endpoint.skins()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/skins')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/account/titles', async () => {
    endpoint = endpoint.titles()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/titles')

    reqMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4, 5])
  })

  it('test /v2/account/transactions', async () => {
    endpoint = endpoint.transactions()
    expect(endpoint.current).to.exist
  })

  it('test /v2/account/wallet', async () => {
    endpoint = endpoint.wallet()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/account/wallet')

    reqMock.addResponse([{id: 1, value: 48043252}, {id: 2, value: 1956351}])
    let content = await endpoint.get()
    expect(content[0].value).to.equal(48043252)
  })
})
