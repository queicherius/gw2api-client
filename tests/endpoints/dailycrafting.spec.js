/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/dailycrafting')

describe('endpoints > dailycrafting', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/dailycrafting', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/dailycrafting')

    fetchMock.addResponse([
      'charged_quartz_crystal',
      'glob_of_elder_spirit_residue'
    ])
    let content = await endpoint.ids()
    expect(content).toEqual([
      'charged_quartz_crystal',
      'glob_of_elder_spirit_residue'
    ])
  })
})
