/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/home')

describe('endpoints > home', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/home/cats', async () => {
    endpoint = endpoint.cats()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/home/cats')

    fetchMock.addResponse({
      id: 1,
      hint: 'chicken'
    })

    let content = await endpoint.get(1)
    expect(content.hint).toEqual('chicken')
  })

  it('test /v2/home/nodes', async () => {
    endpoint = endpoint.nodes()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/home/nodes')

    fetchMock.addResponse({
      id: 'advanced_cloth_rack'
    })

    let content = await endpoint.get('advanced_cloth_rack')
    expect(content.id).toEqual('advanced_cloth_rack')
  })
})
