/* eslint-env jest */
import sinon from 'sinon'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/account'

describe('endpoints > account', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/account', async () => {
    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account')

    fetchMock.addResponse({id: 'unique-identifier', name: 'Account.1234', world: 1007})
    let content = await endpoint.get()
    expect(content.name).toEqual('Account.1234')
  })

  it('test /v2/account/achievements (ids)', async () => {
    endpoint = endpoint.achievements()

    expect()
    let error
    try {
      await endpoint.ids()
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
  })

  it('test /v2/account/achievements (get with id)', async () => {
    endpoint = endpoint.authenticate('XXX').achievements()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/achievements')

    fetchMock.addResponse({id: 1, current: 487, max: 1000, done: false})
    let content = await endpoint.get(1)
    expect(content.current).toEqual(487)
    expect(fetchMock.lastUrl().endsWith('/v2/account/achievements?id=1&access_token=XXX')).toEqual(true)
  })

  it('test /v2/account/achievements (get without id / all)', async () => {
    endpoint = endpoint.authenticate('XXX').achievements()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/achievements')

    fetchMock.addResponse([{id: 1, current: 487, max: 1000, done: false}])
    let contentGet = await endpoint.get()
    expect(contentGet[0].current).toEqual(487)
    expect(fetchMock.lastUrl().endsWith('/v2/account/achievements?access_token=XXX')).toEqual(true)

    let contentAll = await endpoint.all()
    expect(contentAll).toEqual(contentGet)
  })

  it('test /v2/account/bank', async () => {
    endpoint = endpoint.bank()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/bank')

    fetchMock.addResponse([null, null, {id: 123, count: 1}])
    let content = await endpoint.get()
    expect(content[2].id).toEqual(123)
  })

  it('test /v2/account/characters', async () => {
    endpoint = endpoint.characters()
    expect(endpoint.url).toEqual('/v2/characters')
  })

  it('test /v2/account/delivery', async () => {
    endpoint = endpoint.delivery()
    expect(endpoint.url).toEqual('/v2/commerce/delivery')
  })

  it('test /v2/account/dungeons', async () => {
    endpoint = endpoint.dungeons()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/dungeons')

    fetchMock.addResponse(['hodgins', 'seraph'])
    let content = await endpoint.get()
    expect(content).toEqual(['hodgins', 'seraph'])
  })

  it('test /v2/account/dyes', async () => {
    endpoint = endpoint.dyes()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/dyes')

    fetchMock.addResponse([2, 3, 4])
    let content = await endpoint.get()
    expect(content).toEqual([2, 3, 4])
  })

  it('test /v2/account/finishers', async () => {
    endpoint = endpoint.finishers()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/finishers')

    fetchMock.addResponse([2, 3, 4])
    let content = await endpoint.get()
    expect(content).toEqual([2, 3, 4])
  })

  it('test /v2/account/gliders', async () => {
    endpoint = endpoint.gliders()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/gliders')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).toEqual([1, 2, 3])
  })

  it('test /v2/account/home/cats', async () => {
    endpoint = endpoint.home().cats()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/home/cats')

    fetchMock.addResponse([{id: 1, hint: 'chicken'}])
    let content = await endpoint.get()
    expect(content).toEqual([{id: 1, hint: 'chicken'}])
  })

  it('test /v2/account/home/nodes', async () => {
    endpoint = endpoint.home().nodes()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/home/nodes')

    fetchMock.addResponse(['quartz_node', 'airship_cargo'])
    let content = await endpoint.get()
    expect(content).toEqual(['quartz_node', 'airship_cargo'])
  })

  it('test /v2/account/inventory', async () => {
    endpoint = endpoint.inventory()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/inventory')

    fetchMock.addResponse([
      {id: 49308, count: 1, binding: 'Account'},
      {id: 48931, count: 1, binding: 'Account'}
    ])
    let content = await endpoint.get()
    expect(content).toEqual([
      {id: 49308, count: 1, binding: 'Account'},
      {id: 48931, count: 1, binding: 'Account'}
    ])
  })

  it('test /v2/account/mailcarriers', async () => {
    endpoint = endpoint.mailcarriers()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/mailcarriers')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).toEqual([1, 2, 3])
  })

  it('test /v2/account/masteries', async () => {
    endpoint = endpoint.masteries()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/masteries')

    fetchMock.addResponse([{id: 1, level: 4}, {id: 2, level: 5}])
    let content = await endpoint.get()
    expect(content).toEqual([{id: 1, level: 4}, {id: 2, level: 5}])
  })

  it('test /v2/account/mastery/points', async () => {
    endpoint = endpoint.mastery().points()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/mastery/points')

    fetchMock.addResponse({totals: [{region: 'Tyria', spent: 49, earned: 58}]})
    let content = await endpoint.get()
    expect(content).toEqual({totals: [{region: 'Tyria', spent: 49, earned: 58}]})
  })

  it('test /v2/account/materials', async () => {
    endpoint = endpoint.materials()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/materials')

    fetchMock.addResponse([{id: 12134, category: 5, count: 2}])
    let content = await endpoint.get()
    expect(content[0].id).toEqual(12134)
  })

  it('test /v2/account/minis', async () => {
    endpoint = endpoint.minis()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/minis')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).toEqual([2, 3, 4, 5])
  })

  it('test /v2/account/outfits', async () => {
    endpoint = endpoint.outfits()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/outfits')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).toEqual([2, 3, 4, 5])
  })

  it('test /v2/account/pvp', async () => {
    endpoint = endpoint.pvp()
    expect(endpoint.games).not.toEqual(undefined)
  })

  it('test /v2/account/pvp/heroes', async () => {
    endpoint = endpoint.pvp().heroes()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/pvp/heroes')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).toEqual([1, 2, 3])
  })

  it('test /v2/account/raids', async () => {
    endpoint = endpoint.raids()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/raids')

    fetchMock.addResponse(['spirit_woods', 'keep_construct'])
    let content = await endpoint.get()
    expect(content).toEqual(['spirit_woods', 'keep_construct'])
  })

  it('test /v2/account/recipes', async () => {
    endpoint = endpoint.recipes()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/recipes')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).toEqual([2, 3, 4, 5])
  })

  it('test /v2/account/skins', async () => {
    endpoint = endpoint.skins()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/skins')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).toEqual([1, 2, 3])
  })

  it('test /v2/account/titles', async () => {
    endpoint = endpoint.titles()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/titles')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).toEqual([2, 3, 4, 5])
  })

  it('test /v2/account/transactions', async () => {
    endpoint = endpoint.transactions()
    expect(endpoint.current).not.toEqual(undefined)
  })

  it('test /v2/account/wallet', async () => {
    endpoint = endpoint.wallet()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/wallet')

    fetchMock.addResponse([{id: 1, value: 48043252}, {id: 2, value: 1956351}])
    let content = await endpoint.get()
    expect(content[0].value).toEqual(48043252)
  })

  it('test /v2/account .blob()', async () => {
    const spy = sinon.spy()
    Module.__set__('accountBlob', spy)
    endpoint.blob()
    expect(spy.called).toEqual(true)
  })
})
