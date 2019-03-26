/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/recipes')

describe('endpoints > recipes', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
    endpoint.schema('schema')
  })

  it('test /v2/recipes', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/recipes')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).toEqual([1, 2, 3])
  })

  it('test /v2/recipes/search (input)', async () => {
    endpoint = endpoint.search()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/recipes/search')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.input(123)
    expect(content).toEqual([1, 2, 3])
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/recipes/search?v=schema&input=123'))
  })

  it('test /v2/recipes/search (output)', async () => {
    endpoint = endpoint.search()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/recipes/search')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.output(123)
    expect(content).toEqual([1, 2, 3])
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v2/recipes/search?v=schema&output=123'))
  })
})
