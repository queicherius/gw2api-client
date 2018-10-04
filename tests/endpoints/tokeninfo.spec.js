/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/tokeninfo')

describe('endpoints > tokeninfo', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/tokeninfo', async () => {
    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/tokeninfo')

    fetchMock.addResponse({ id: 'uuid', name: 'public key', permissions: ['account'] })
    let content = await endpoint.get()
    expect(content.name).toEqual('public key')
  })
})
