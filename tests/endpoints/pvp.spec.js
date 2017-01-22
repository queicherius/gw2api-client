/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/pvp'

describe('endpoints > pvp', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/pvp/amulets', async () => {
    endpoint = endpoint.amulets()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/pvp/amulets')

    fetchMock.addResponse({id: 4, name: 'Assassin Amulet'})
    let content = await endpoint.get(4)
    expect(content.name).to.equal('Assassin Amulet')
  })

  it('test /v2/pvp/games', async () => {
    endpoint = endpoint.games()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/pvp/games')

    fetchMock.addResponse(['uuid1', 'uuid2'])
    let content = await endpoint.ids()
    expect(content).to.deep.equal(['uuid1', 'uuid2'])
  })

  it('test /v2/pvp/ranks', async () => {
    endpoint = endpoint.ranks()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/pvp/ranks')

    fetchMock.addResponse({id: 1, name: 'Rabbit'})
    let content = await endpoint.get(1)
    expect(content.name).to.equal('Rabbit')
  })

  it('test /v2/pvp/seasons', async () => {
    endpoint = endpoint.seasons()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/pvp/seasons')

    fetchMock.addResponse({id: 'S0ME-UU1D', name: 'PvP League Season Four'})
    let content = await endpoint.get('S0ME-UU1D')
    expect(content.name).to.equal('PvP League Season Four')
  })

  it('test /v2/pvp/seasons/:id/leaderboards', async () => {
    endpoint = endpoint.seasons('S0ME-UU1D').leaderboards()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/pvp/seasons/S0ME-UU1D/leaderboards')

    fetchMock.addResponse(['ladder'])
    let content = await endpoint.ids()
    expect(content).to.deep.equal(['ladder'])
    expect(fetchMock.lastUrl()).contains('/v2/pvp/seasons/S0ME-UU1D/leaderboards')
  })

  it('test /v2/pvp/seasons/:id/leaderboards/:board/:region', async () => {
    endpoint = endpoint.seasons('S0ME-UU1D').leaderboards().board('ladder', 'na')

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/pvp/seasons/S0ME-UU1D/leaderboards/ladder/na')

    fetchMock.addResponse([{rank: 1, name: 'Herp.1234'}, {rank: 2, name: 'Derp.1234'}])
    let content = await endpoint.page(1, 2)
    expect(content[0].name).to.equal('Herp.1234')
    expect(fetchMock.lastUrl()).contains('/v2/pvp/seasons/S0ME-UU1D/leaderboards/ladder/na?page=1&page_size=2')
  })

  it('test /v2/pvp/standings', async () => {
    endpoint = endpoint.standings()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/pvp/standings')

    fetchMock.addResponse([{season_id: 'UUID', current: {tier: 1}}])
    let content = await endpoint.get()
    expect(content[0].season_id).to.equal('UUID')
  })

  it('test /v2/pvp/stats', async () => {
    endpoint = endpoint.stats()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/pvp/stats')

    fetchMock.addResponse({pvp_rank: 80})
    let content = await endpoint.get()
    expect(content.pvp_rank).to.equal(80)
  })
})
