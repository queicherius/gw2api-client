/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/pvp')

describe('endpoints > pvp', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
    endpoint.schema('schema')
  })

  it('test /v2/pvp/amulets', async () => {
    endpoint = endpoint.amulets()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/amulets')

    fetchMock.addResponse({ id: 4, name: 'Assassin Amulet' })
    let content = await endpoint.get(4)
    expect(content.name).toEqual('Assassin Amulet')
  })

  it('test /v2/pvp/games', async () => {
    endpoint = endpoint.games()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/games')

    fetchMock.addResponse(['uuid1', 'uuid2'])
    let content = await endpoint.ids()
    expect(content).toEqual(['uuid1', 'uuid2'])
  })

  it('test /v2/pvp/heroes', async () => {
    endpoint = endpoint.heroes()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/heroes')

    fetchMock.addResponse({ id: 1, name: 'Nika' })
    let content = await endpoint.get(1)
    expect(content.name).toEqual('Nika')
  })

  it('test /v2/pvp/ranks', async () => {
    endpoint = endpoint.ranks()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/ranks')

    fetchMock.addResponse({ id: 1, name: 'Rabbit' })
    let content = await endpoint.get(1)
    expect(content.name).toEqual('Rabbit')
  })

  it('test /v2/pvp/seasons', async () => {
    endpoint = endpoint.seasons()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/seasons')

    fetchMock.addResponse({ id: 'S0ME-UU1D', name: 'PvP League Season Four' })
    let content = await endpoint.get('S0ME-UU1D')
    expect(content.name).toEqual('PvP League Season Four')
  })

  it('test /v2/pvp/seasons/:id/leaderboards', async () => {
    endpoint = endpoint.seasons('S0ME-UU1D').leaderboards()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/seasons/S0ME-UU1D/leaderboards')

    fetchMock.addResponse(['ladder'])
    let content = await endpoint.ids()
    expect(content).toEqual(['ladder'])
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/pvp/seasons/S0ME-UU1D/leaderboards'))
  })

  it('test /v2/pvp/seasons/:id/leaderboards/:board/:region', async () => {
    endpoint = endpoint.seasons('S0ME-UU1D').leaderboards().board('ladder', 'na')

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/seasons/S0ME-UU1D/leaderboards/ladder/na')

    fetchMock.addResponse([{ rank: 1, name: 'Herp.1234' }, { rank: 2, name: 'Derp.1234' }])
    let content = await endpoint.page(1, 2)
    expect(content[0].name).toEqual('Herp.1234')
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/pvp/seasons/S0ME-UU1D/leaderboards/ladder/na?v=schema&page=1&page_size=2'))
  })

  it('test /v2/pvp/standings', async () => {
    endpoint = endpoint.standings()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/standings')

    fetchMock.addResponse([{ season_id: 'UUID', current: { tier: 1 } }])
    let content = await endpoint.get()
    expect(content[0].season_id).toEqual('UUID')
  })

  it('test /v2/pvp/stats', async () => {
    endpoint = endpoint.stats()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/pvp/stats')

    fetchMock.addResponse({ pvp_rank: 80 })
    let content = await endpoint.get()
    expect(content.pvp_rank).toEqual(80)
  })
})
