/* eslint-env node, mocha */
const expect = require('chai').expect
const {mockClient, reqMock} = require('../mocks/client.mock.js')
const Module = require('../../src/endpoints/pvp.js')

describe('endpoints > pvp', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    reqMock.reset()
  })

  it('test /v2/pvp/amulets', async () => {
    endpoint = endpoint.amulets()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/pvp/amulets')

    reqMock.addResponse({id: 4, name: 'Assassin Amulet'})
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
    expect(endpoint.url).to.equal('/v2/pvp/games')

    reqMock.addResponse(['uuid1', 'uuid2'])
    let content = await endpoint.ids()
    expect(content).to.deep.equal(['uuid1', 'uuid2'])
  })

  it('test /v2/pvp/seasons', async () => {
    endpoint = endpoint.seasons()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/pvp/seasons')

    reqMock.addResponse({id: 'S0ME-UU1D', name: 'PvP League Season Four'})
    let content = await endpoint.get('S0ME-UU1D')
    expect(content.name).to.equal('PvP League Season Four')
  })

  it('test /v2/pvp/standings', async () => {
    endpoint = endpoint.standings()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/pvp/standings')

    reqMock.addResponse([{season_id: 'UUID', current: {tier: 1}}])
    let content = await endpoint.get()
    expect(content[0].season_id).to.equal('UUID')
  })

  it('test /v2/pvp/stats', async () => {
    endpoint = endpoint.stats()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/pvp/stats')

    reqMock.addResponse({pvp_rank: 80})
    let content = await endpoint.get()
    expect(content.pvp_rank).to.equal(80)
  })
})
