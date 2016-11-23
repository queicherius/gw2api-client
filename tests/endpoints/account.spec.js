/* eslint-env node, mocha */
import {expect} from 'chai'
import {mockClient, fetchMock} from '../mocks/client.mock'
import Module from '../../src/endpoints/account'

describe('endpoints > account', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/account', async () => {
    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account')

    fetchMock.addResponse({id: 'unique-identifier', name: 'Account.1234', world: 1007})
    let content = await endpoint.get()
    expect(content.name).to.equal('Account.1234')
  })

  it('test /v2/account/achievements', async () => {
    endpoint = endpoint.achievements()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/achievements')

    fetchMock.addResponse([{id: 1, current: 487, max: 1000, done: false}])
    let content = await endpoint.get()
    expect(content[0].current).to.equal(487)
  })

  it('test /v2/account/bank', async () => {
    endpoint = endpoint.bank()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/bank')

    fetchMock.addResponse([null, null, {id: 123, count: 1}])
    let content = await endpoint.get()
    expect(content[2].id).to.equal(123)
  })

  it('test /v2/account/characters', async () => {
    endpoint = endpoint.characters()
    expect(endpoint.url).to.equal('/v2/characters')
  })

  it('test /v2/account/dyes', async () => {
    endpoint = endpoint.dyes()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/dyes')

    fetchMock.addResponse([2, 3, 4])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4])
  })

  it('test /v2/account/finishers', async () => {
    endpoint = endpoint.finishers()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/finishers')

    fetchMock.addResponse([2, 3, 4])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4])
  })

  it('test /v2/account/inventory', async () => {
    endpoint = endpoint.inventory()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/inventory')

    fetchMock.addResponse([
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

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/masteries')

    fetchMock.addResponse([{id: 1, level: 4}, {id: 2, level: 5}])
    let content = await endpoint.get()
    expect(content).to.deep.equal([{id: 1, level: 4}, {id: 2, level: 5}])
  })

  it('test /v2/account/materials', async () => {
    endpoint = endpoint.materials()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/materials')

    fetchMock.addResponse([{id: 12134, category: 5, count: 2}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal(12134)
  })

  it('test /v2/account/minis', async () => {
    endpoint = endpoint.minis()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/minis')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4, 5])
  })

  it('test /v2/account/outfits', async () => {
    endpoint = endpoint.outfits()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/outfits')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4, 5])
  })

  it('test /v2/account/pvp', async () => {
    endpoint = endpoint.pvp()
    expect(endpoint.games).to.exist
  })

  it('test /v2/account/recipes', async () => {
    endpoint = endpoint.recipes()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/recipes')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4, 5])
  })

  it('test /v2/account/skins', async () => {
    endpoint = endpoint.skins()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/skins')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/account/titles', async () => {
    endpoint = endpoint.titles()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/titles')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).to.deep.equal([2, 3, 4, 5])
  })

  it('test /v2/account/transactions', async () => {
    endpoint = endpoint.transactions()
    expect(endpoint.current).to.exist
  })

  it('test /v2/account/wallet', async () => {
    endpoint = endpoint.wallet()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/account/wallet')

    fetchMock.addResponse([{id: 1, value: 48043252}, {id: 2, value: 1956351}])
    let content = await endpoint.get()
    expect(content[0].value).to.equal(48043252)
  })

  it('test /v2/account .blob()', async () => {
    endpoint.client = {
      ...endpoint.client,
      account: () => ({
        get: () => Promise.resolve({name: 'lol.1234', guilds: ['key-1234']}),
        achievements: () => ({get: () => Promise.resolve([{id: 1, foo: 'bar'}])}),
        bank: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        dyes: () => ({get: () => Promise.resolve([1, 2, 3])}),
        finishers: () => ({get: () => Promise.resolve([1, 2, 3])}),
        inventory: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        materials: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        minis: () => ({get: () => Promise.resolve([1, 2, 3])}),
        outfits: () => ({get: () => Promise.resolve([1, 2, 3])}),
        recipes: () => ({get: () => Promise.resolve([1, 2, 3])}),
        skins: () => ({get: () => Promise.resolve([1, 2, 3])}),
        titles: () => ({get: () => Promise.reject({response: {status: 403}})}),
        wallet: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        pvp: () => ({
          games: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
          standings: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
          stats: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])})
        })
      }),
      characters: () => ({
        all: () => Promise.resolve([{id: 123, foo: 'bar'}])
      }),
      commerce: () => ({
        transactions: () => ({
          current: () => ({
            buys: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
            sells: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])})
          })
        })
      }),
      guild: () => ({
        get: () => Promise.resolve({id: 123, foo: 'bar'}),
        members: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        ranks: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        stash: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        teams: () => ({get: () => Promise.reject({content: {text: 'access restricted to guild leaders'}})}),
        treasury: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        upgrades: () => ({get: () => Promise.resolve([1, 2, 3])})
      })
    }

    let content = await endpoint.blob()

    expect(content).to.deep.equal({
      account: {name: 'lol.1234', guilds: ['key-1234']},
      achievements: [{id: 1, foo: 'bar'}],
      bank: [{id: 123, foo: 'bar'}],
      characters: [{id: 123, foo: 'bar'}],
      commerce: {
        buys: [{id: 123, foo: 'bar'}],
        sells: [{id: 123, foo: 'bar'}]
      },
      dyes: [1, 2, 3],
      finishers: [1, 2, 3],
      materials: [{id: 123, foo: 'bar'}],
      minis: [1, 2, 3],
      outfits: [1, 2, 3],
      pvp: {
        games: [{id: 123, foo: 'bar'}],
        standings: [{id: 123, foo: 'bar'}],
        stats: [{id: 123, foo: 'bar'}]
      },
      recipes: [1, 2, 3],
      shared: [{id: 123, foo: 'bar'}],
      skins: [1, 2, 3],
      titles: null,
      wallet: [{id: 123, foo: 'bar'}],
      guilds: [
        {
          data: {id: 123, foo: 'bar'},
          members: [{id: 123, foo: 'bar'}],
          ranks: [{id: 123, foo: 'bar'}],
          stash: [{id: 123, foo: 'bar'}],
          teams: null,
          treasury: [{id: 123, foo: 'bar'}],
          upgrades: [1, 2, 3]
        }
      ]
    })
  })

  it('test /v2/account .blob() handling errors', async () => {
    endpoint.client = {
      ...endpoint.client,
      account: () => ({
        get: () => Promise.reject('Oh no.')
      })
    }

    let error

    try {
      await endpoint.blob()
    } catch (err) {
      error = err
    }

    expect(error).to.deep.equal('Oh no.')
  })
})
