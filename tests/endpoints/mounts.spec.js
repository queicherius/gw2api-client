/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/mounts'

describe('endpoints > mounts', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/mounts/types', async () => {
    endpoint = endpoint.types()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/mounts/types')

    fetchMock.addResponse(['raptor', 'skimmer'])
    let content = await endpoint.ids()
    expect(content).to.deep.equal(['raptor', 'skimmer'])
  })

  it('test /v2/mounts/skins', async () => {
    endpoint = endpoint.skins()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/mounts/skins')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3])
  })
})
