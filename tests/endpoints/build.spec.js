/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/build')

describe('endpoints > build', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/build', async () => {
    fetchMock.addResponse({ id: 1337 })

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/build')

    let id = await endpoint.get()
    expect(id).toEqual(1337)
  })
})
