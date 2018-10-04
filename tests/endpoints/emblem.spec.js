/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/emblem')

describe('endpoints > emblem', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/emblem/backgrounds', async () => {
    endpoint = endpoint.backgrounds()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/emblem/backgrounds')

    fetchMock.addResponse({ id: 1, layers: ['1.png', '2.png'] })
    let content = await endpoint.get(1)
    expect(content.id).toEqual(1)
  })

  it('test /v2/emblem/foregrounds', async () => {
    endpoint = endpoint.foregrounds()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/emblem/foregrounds')

    fetchMock.addResponse({ id: 1, layers: ['1.png', '2.png'] })
    let content = await endpoint.get(1)
    expect(content.id).toEqual(1)
  })
})
