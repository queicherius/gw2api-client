/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/worldbosses')

describe('endpoints > worldbosses', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/worldbosses', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/worldbosses')

    fetchMock.addResponse([
      'admiral_taidha_covington',
      'claw_of_jormag',
      'fire_elemental'
    ])
    let content = await endpoint.ids()
    expect(content).toEqual([
      'admiral_taidha_covington',
      'claw_of_jormag',
      'fire_elemental'
    ])
  })
})
