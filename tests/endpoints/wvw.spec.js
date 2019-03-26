/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/wvw')

describe('endpoints > wvw', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
    endpoint.schema('schema')
  })

  it('test /v2/wvw/abilities', async () => {
    endpoint = endpoint.abilities()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/abilities')

    fetchMock.addResponse({ id: 1, name: 'Guard Killer' })
    let content = await endpoint.get(1)
    expect(content.name).toEqual('Guard Killer')
  })

  it('test /v2/wvw/matches', async () => {
    endpoint = endpoint.matches()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/matches')

    fetchMock.addResponse({ id: '2-6', scores: { red: 123, blue: 456, green: 789 } })
    let content = await endpoint.get('2-6')
    expect(content.scores.red).toEqual(123)
  })

  it('test /v2/wvw/matches (world)', async () => {
    endpoint = endpoint.matches()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/matches')

    fetchMock.addResponse({ id: '2-6', worlds: { red: 2002, blue: 2007, green: 2202 }, scores: { red: 123, blue: 456, green: 789 } })
    let content = await endpoint.world(2002)
    expect(content.scores.red).toEqual(123)
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/wvw/matches?v=schema&world=2002'))
  })

  it('test /v2/wvw/matches/overview', async () => {
    endpoint = endpoint.matches().overview()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/matches/overview')

    fetchMock.addResponse({ id: '2-6', worlds: { red: 2002, blue: 2007, green: 2202 } })
    let content = await endpoint.get('2-6')
    expect(content.worlds.red).toEqual(2002)
  })

  it('test /v2/wvw/matches/overview (world)', async () => {
    endpoint = endpoint.matches().overview()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/matches/overview')

    fetchMock.addResponse({ id: '2-6', worlds: { red: 2002, blue: 2007, green: 2202 } })
    let content = await endpoint.world(2002)
    expect(content.worlds.red).toEqual(2002)
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/wvw/matches/overview?v=schema&world=2002'))
  })

  it('test /v2/wvw/matches/scores', async () => {
    endpoint = endpoint.matches().scores()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/matches/scores')

    fetchMock.addResponse({ id: '2-6', scores: { red: 123, blue: 456, green: 789 } })
    let content = await endpoint.get('2-6')
    expect(content.scores.red).toEqual(123)
  })

  it('test /v2/wvw/matches/scores (world)', async () => {
    endpoint = endpoint.matches().scores()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/matches/scores')

    fetchMock.addResponse({ id: '2-6', worlds: { red: 2002, blue: 2007, green: 2202 }, scores: { red: 123, blue: 456, green: 789 } })
    let content = await endpoint.world(2002)
    expect(content.scores.red).toEqual(123)
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/wvw/matches/scores?v=schema&world=2002'))
  })

  it('test /v2/wvw/matches/stats', async () => {
    endpoint = endpoint.matches().stats()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/matches/stats')

    fetchMock.addResponse({ id: '2-6', deaths: { red: 333, blue: 456, green: 789 } })
    let content = await endpoint.get('2-6')
    expect(content.deaths.red).toEqual(333)
  })

  it('test /v2/wvw/matches/stats (world)', async () => {
    endpoint = endpoint.matches().stats()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/matches/stats')

    fetchMock.addResponse({ id: '2-6', worlds: { red: 2002, blue: 2007, green: 2202 }, deaths: { red: 333, blue: 456, green: 789 } })
    let content = await endpoint.world(2002)
    expect(content.deaths.red).toEqual(333)
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/wvw/matches/stats?v=schema&world=2002'))
  })

  it('test /v2/wvw/matches/stats/:id/teams', async () => {
    endpoint = endpoint.matches().stats('2-6').teams()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.url).toEqual('/v2/wvw/matches/stats/2-6/teams')

    fetchMock.addResponse(['red', 'blue', 'green'])
    let content = await endpoint.get()
    expect(content).toEqual(['red', 'blue', 'green'])
  })

  it('test /v2/wvw/matches/stats/:id/teams/:team/top/kdr', async () => {
    endpoint = endpoint.matches().stats('2-6').teams('blue').top('kdr')

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.url).toEqual('/v2/wvw/matches/stats/2-6/teams/blue/top/kdr')

    fetchMock.addResponse([{ guild_id: 'F8CDF1E0-2D64-4D71-81E2-049B0796B7AE', deaths: { red: 13, blue: 45, green: 27 } }])
    let content = await endpoint.get()
    expect(content[0].deaths.red).toEqual(13)
  })

  it('test /v2/wvw/objectives', async () => {
    endpoint = endpoint.objectives()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/objectives')

    fetchMock.addResponse([{ id: '968-98', name: 'Wurm Tunnel' }])
    let content = await endpoint.many(['968-98'])
    expect(content[0].name).toEqual('Wurm Tunnel')
  })

  it('test /v2/wvw/upgrades', async () => {
    endpoint = endpoint.upgrades()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/upgrades')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).toEqual([1, 2, 3])
  })

  it('test /v2/wvw/ranks', async () => {
    endpoint = endpoint.ranks()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/wvw/ranks')

    fetchMock.addResponse([{ id: 42, title: 'Silver General', min_rank: 1170 }])
    let content = await endpoint.many([42])
    expect(content[0].title).toEqual('Silver General')
  })
})
