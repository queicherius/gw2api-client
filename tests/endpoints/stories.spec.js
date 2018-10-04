/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/stories')

describe('endpoints > stories', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/stories', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/stories')

    fetchMock.addResponse({ id: 1, name: 'My Story' })
    let content = await endpoint.get(1)
    expect(content.name).toEqual('My Story')
  })

  it('test /v2/stories/seasons', async () => {
    endpoint = endpoint.seasons()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/stories/seasons')

    fetchMock.addResponse({ id: 'S0ME-UU1D', name: 'Scarlet\'s War' })
    let content = await endpoint.get('S0ME-UU1D')
    expect(content.name).toEqual('Scarlet\'s War')
  })
})
