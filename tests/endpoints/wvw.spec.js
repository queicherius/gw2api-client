/* eslint-env node, mocha */
import {expect} from 'chai'
import {mockClient, fetchMock} from '../mocks/client.mock'
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
    expect(endpoint.url).to.equal('/v2/wvw/matches')

    fetchMock.addResponse({id: '2-6', scores: {red: 123, blue: 456, green: 789}})
    let content = await endpoint.get('2-6')
    expect(content.scores.red).to.equal(123)
  })

  it('test /v2/wvw/objectives', async () => {
    endpoint = endpoint.objectives()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/wvw/objectives')

    fetchMock.addResponse([{id: '968-98', name: 'Wurm Tunnel'}])
    let content = await endpoint.many(['968-98'])
    expect(content[0].name).to.equal('Wurm Tunnel')
  })
})
