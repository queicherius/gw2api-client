/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/stories'

describe('endpoints > stories', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/stories', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/stories')

    fetchMock.addResponse({id: 1, name: 'My Story'})
    let content = await endpoint.get(1)
    expect(content.name).to.equal('My Story')
  })

  it('test /v2/stories/seasons', async () => {
    endpoint = endpoint.seasons()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/stories/seasons')

    fetchMock.addResponse({id: 'S0ME-UU1D', name: 'Scarlet\'s War'})
    let content = await endpoint.get('S0ME-UU1D')
    expect(content.name).to.equal('Scarlet\'s War')
  })
})
