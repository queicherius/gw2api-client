/* eslint-env jest */
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/dungeons'

describe('endpoints > dungeons', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/dungeons', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/dungeons')

    fetchMock.addResponse(['ascalonian_catacombs', 'caudecus_manor'])
    let content = await endpoint.ids()
    expect(content).toEqual(['ascalonian_catacombs', 'caudecus_manor'])
  })
})
