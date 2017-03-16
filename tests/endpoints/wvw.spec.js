/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/wvw'

describe('endpoints > wvw', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/wvw/abilities', async () => {
    endpoint = endpoint.abilities()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/wvw/abilities')

    fetchMock.addResponse({id: 1, name: 'Guard Killer'})
    let content = await endpoint.get(1)
    expect(content.name).to.equal('Guard Killer')
  })

  it('test /v2/wvw/matches', async () => {
    endpoint = endpoint.matches()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/wvw/matches')

    fetchMock.addResponse({id: '2-6', scores: {red: 123, blue: 456, green: 789}})
    let content = await endpoint.get('2-6')
    expect(content.scores.red).to.equal(123)
  })

  it('test /v2/wvw/matches/overview', async () => {
    endpoint = endpoint.matches().overview()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/wvw/matches/overview')

    fetchMock.addResponse({id: '2-6', worlds: {red: 2002, blue: 2007, green: 2202}})
    let content = await endpoint.get('2-6')
    expect(content.worlds.red).to.equal(2002)
  })

  it('test /v2/wvw/matches/scores', async () => {
    endpoint = endpoint.matches().scores()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/wvw/matches/scores')

    fetchMock.addResponse({id: '2-6', scores: {red: 123, blue: 456, green: 789}})
    let content = await endpoint.get('2-6')
    expect(content.scores.red).to.equal(123)
  })

  it('test /v2/wvw/matches/stats', async () => {
    endpoint = endpoint.matches().stats()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/wvw/matches/stats')

    fetchMock.addResponse({id: '2-6', deaths: {red: 333, blue: 456, green: 789}})
    let content = await endpoint.get('2-6')
    expect(content.deaths.red).to.equal(333)
  })

  it('test /v2/wvw/objectives', async () => {
    endpoint = endpoint.objectives()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/wvw/objectives')

    fetchMock.addResponse([{id: '968-98', name: 'Wurm Tunnel'}])
    let content = await endpoint.many(['968-98'])
    expect(content[0].name).to.equal('Wurm Tunnel')
  })

  it('test /v2/wvw/upgrades', async () => {
    endpoint = endpoint.upgrades()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/wvw/upgrades')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/wvw/ranks', async () => {
    endpoint = endpoint.ranks()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/wvw/ranks')

    fetchMock.addResponse([{id: 42, title: 'Silver General', min_rank: 1170}])
    let content = await endpoint.many([42])
    expect(content[0].title).to.equal('Silver General')
  })
})
