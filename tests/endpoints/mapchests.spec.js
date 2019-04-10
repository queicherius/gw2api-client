/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/mapchests')

describe('endpoints > mapchests', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/mapchests', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/mapchests')

    fetchMock.addResponse(['auric_basin_heros_choice_chest', 'dragons_stand_heros_choice_chest'])
    let content = await endpoint.ids()
    expect(content).toEqual(['auric_basin_heros_choice_chest', 'dragons_stand_heros_choice_chest'])
  })
})
