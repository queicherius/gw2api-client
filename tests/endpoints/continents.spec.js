/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/continents')

describe('endpoints > continents', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/continents', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/continents')

    fetchMock.addResponse([1, 2])
    let content = await endpoint.ids()
    expect(content).toEqual([1, 2])
  })

  it('test /v2/continents/1/floors', async () => {
    endpoint = endpoint.floors(1)

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/continents/1/floors')

    fetchMock.addResponse({ texture_dims: [1, 2], clamed_view: [[1, 2]] })
    let content = await endpoint.get(42)
    expect(content.texture_dims).toEqual([1, 2])
  })
})
