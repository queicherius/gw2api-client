/* eslint-env jest */
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/specializations'

describe('endpoints > specializations', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/specializations', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/specializations')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).toEqual([1, 2, 3])
  })
})
