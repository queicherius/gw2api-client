/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/jadebots')

describe('endpoints > jadebots', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/jadebots', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/jadebots')

    fetchMock.addResponse({ id: 2, name: 'Cuddly Cat' })
    let content = await endpoint.get(2)
    expect(content.name).toEqual('Cuddly Cat')
  })
})
