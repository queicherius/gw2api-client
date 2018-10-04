/* eslint-env jest */
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/files'

describe('endpoints > files', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/files', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/files')

    fetchMock.addResponse(['map_complete', 'map_dungeon', 'map_heart_empty'])
    let content = await endpoint.ids()
    expect(content[0]).toEqual('map_complete')
  })
})
