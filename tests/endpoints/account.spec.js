/* eslint-env jest */
const mockdate = require('mockdate')
const nullCache = require('../../src/cache/null')
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/account')

describe('endpoints > account', () => {
  let endpoint
  beforeEach(() => {
    mockdate.set('2019-04-02T17:05:00Z')

    // No caching because we depend on "live" mocked data for some tests
    mockClient.caches = [nullCache()]
    endpoint = new Module(mockClient)
    fetchMock.reset()
    endpoint.schema('schema')
  })

  it('test /v2/account', async () => {
    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account')

    fetchMock.addResponse({ id: 'unique-identifier', name: 'Account.1234', world: 1007 })
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

    fetchMock.addResponse({ id: 1, current: 487, max: 1000, done: false })
    let content = await endpoint.get(1)
    expect(content.current).toEqual(487)
    expect(fetchMock.lastUrl().endsWith('/v2/account/achievements?v=schema&access_token=XXX&id=1')).toEqual(true)
  })

  it('test /v2/account/achievements (get without id / all)', async () => {
    endpoint = endpoint.authenticate('XXX').achievements()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/achievements')

    fetchMock.addResponse([{ id: 1, current: 487, max: 1000, done: false }])
    let contentGet = await endpoint.get()
    expect(contentGet[0].current).toEqual(487)
    expect(fetchMock.lastUrl().endsWith('/v2/account/achievements?v=schema&access_token=XXX')).toEqual(true)

    fetchMock.addResponse([{ id: 1, current: 487, max: 1000, done: false }])
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

    fetchMock.addResponse([null, null, { id: 123, count: 1 }])
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

  it('test /v2/account/dailycrafting (up to date)', async () => {
    endpoint = endpoint.dailycrafting()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/dailycrafting')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-02T07:03:00Z' })
    fetchMock.addResponse(['charged_quartz_crystal', 'glob_of_elder_spirit_residue'])
    let content = await endpoint.get()
    expect(content).toEqual(['charged_quartz_crystal', 'glob_of_elder_spirit_residue'])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false',
      'https://api.guildwars2.com/v2/account/dailycrafting?v=schema&access_token=false'
    ])
  })

  it('test /v2/account/dailycrafting (stale)', async () => {
    endpoint = endpoint.dailycrafting()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/dailycrafting')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-01T23:53:00Z' })
    fetchMock.addResponse(['charged_quartz_crystal', 'glob_of_elder_spirit_residue'])
    let content = await endpoint.get()
    expect(content).toEqual([])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false'
    ])
  })

  it('test /v2/account/dungeons (up to date)', async () => {
    endpoint = endpoint.dungeons()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/dungeons')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-02T07:03:00Z' })
    fetchMock.addResponse(['hodgins', 'seraph'])
    let content = await endpoint.get()
    expect(content).toEqual(['hodgins', 'seraph'])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false',
      'https://api.guildwars2.com/v2/account/dungeons?v=schema&access_token=false'
    ])
  })

  it('test /v2/account/dungeons (stale)', async () => {
    endpoint = endpoint.dungeons()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/dungeons')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-01T23:53:00Z' })
    fetchMock.addResponse(['hodgins', 'seraph'])
    let content = await endpoint.get()
    expect(content).toEqual([])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false'
    ])
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

    fetchMock.addResponse([{ id: 1, hint: 'chicken' }])
    let content = await endpoint.get()
    expect(content).toEqual([{ id: 1, hint: 'chicken' }])
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
      { id: 49308, count: 1, binding: 'Account' },
      { id: 48931, count: 1, binding: 'Account' }
    ])
    let content = await endpoint.get()
    expect(content).toEqual([
      { id: 49308, count: 1, binding: 'Account' },
      { id: 48931, count: 1, binding: 'Account' }
    ])
  })

  it('test /v2/account/luck', async () => {
    endpoint = endpoint.luck()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/luck')

    fetchMock.addResponse([
      {
        'id': 'luck',
        'value': 2682395
      }
    ])
    let content = await endpoint.get()
    expect(content).toEqual(2682395)
  })

  it('test /v2/account/luck [API PATCH #0]', async () => {
    endpoint = endpoint.luck()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/luck')

    fetchMock.addResponse([])
    let content = await endpoint.get()
    expect(content).toEqual(0)
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

  it('test /v2/account/mapchests (up to date)', async () => {
    endpoint = endpoint.mapchests()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/mapchests')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-02T07:03:00Z' })
    fetchMock.addResponse(['auric_basin_heros_choice_chest', 'dragons_stand_heros_choice_chest'])
    let content = await endpoint.get()
    expect(content).toEqual(['auric_basin_heros_choice_chest', 'dragons_stand_heros_choice_chest'])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false',
      'https://api.guildwars2.com/v2/account/mapchests?v=schema&access_token=false'
    ])
  })

  it('test /v2/account/mapchests (stale)', async () => {
    endpoint = endpoint.mapchests()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/mapchests')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-01T23:53:00Z' })
    fetchMock.addResponse(['auric_basin_heros_choice_chest', 'dragons_stand_heros_choice_chest'])
    let content = await endpoint.get()
    expect(content).toEqual([])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false'
    ])
  })

  it('test /v2/account/masteries', async () => {
    endpoint = endpoint.masteries()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/masteries')

    fetchMock.addResponse([{ id: 1, level: 4 }, { id: 2, level: 5 }])
    let content = await endpoint.get()
    expect(content).toEqual([{ id: 1, level: 4 }, { id: 2, level: 5 }])
  })

  it('test /v2/account/mastery/points', async () => {
    endpoint = endpoint.mastery().points()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/mastery/points')

    fetchMock.addResponse({ totals: [{ region: 'Tyria', spent: 49, earned: 58 }] })
    let content = await endpoint.get()
    expect(content).toEqual({ totals: [{ region: 'Tyria', spent: 49, earned: 58 }] })
  })

  it('test /v2/account/materials', async () => {
    endpoint = endpoint.materials()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/materials')

    fetchMock.addResponse([{ id: 12134, category: 5, count: 2 }])
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

  it('test /v2/account/mounts/skins', async () => {
    endpoint = endpoint.mounts().skins()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/mounts/skins')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).toEqual([2, 3, 4, 5])
  })

  it('test /v2/account/mounts/types', async () => {
    endpoint = endpoint.mounts().types()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/mounts/types')

    fetchMock.addResponse([2, 3, 4, 5])
    let content = await endpoint.get()
    expect(content).toEqual([2, 3, 4, 5])
  })

  it('test /v2/account/novelties', async () => {
    endpoint = endpoint.novelties()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/novelties')

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

  it('test /v2/account/raids (up to date)', async () => {
    endpoint = endpoint.raids()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/raids')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-02T01:03:00Z' })
    fetchMock.addResponse(['spirit_woods', 'keep_construct'])
    let content = await endpoint.get()
    expect(content).toEqual(['spirit_woods', 'keep_construct'])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false',
      'https://api.guildwars2.com/v2/account/raids?v=schema&access_token=false'
    ])
  })

  it('test /v2/account/raids (stale)', async () => {
    endpoint = endpoint.raids()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/raids')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-01T06:53:00Z' })
    fetchMock.addResponse(['spirit_woods', 'keep_construct'])
    let content = await endpoint.get()
    expect(content).toEqual([])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false'
    ])
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

    fetchMock.addResponse([{ id: 1, value: 48043252 }, { id: 2, value: 1956351 }])
    let content = await endpoint.get()
    expect(content[0].value).toEqual(48043252)
  })

  it('test /v2/account/worldbosses (up to date)', async () => {
    endpoint = endpoint.worldbosses()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/worldbosses')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-02T07:03:00Z' })
    fetchMock.addResponse(['admiral_taidha_covington', 'claw_of_jormag'])
    let content = await endpoint.get()
    expect(content).toEqual(['admiral_taidha_covington', 'claw_of_jormag'])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false',
      'https://api.guildwars2.com/v2/account/worldbosses?v=schema&access_token=false'
    ])
  })

  it('test /v2/account/worldbosses (stale)', async () => {
    endpoint = endpoint.worldbosses()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/account/worldbosses')

    fetchMock.addResponse({ name: 'AAA.1234', last_modified: '2019-04-01T23:53:00Z' })
    fetchMock.addResponse(['admiral_taidha_covington', 'claw_of_jormag'])
    let content = await endpoint.get()
    expect(content).toEqual([])

    expect(fetchMock.urls()).toEqual([
      'https://api.guildwars2.com/v2/account?v=2019-03-26&access_token=false'
    ])
  })

  it('test /v2/account .blob()', async () => {
    const blobMock = jest.fn()
    Module.__set__('accountBlob', blobMock)
    endpoint.blob()
    expect(blobMock.mock.calls.length).toEqual(1)
  })
})
