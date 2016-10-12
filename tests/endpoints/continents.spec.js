/* eslint-env node, mocha */
import {expect} from 'chai'
import {mockClient, fetchMock} from '../mocks/client.mock'
import Module from '../../src/endpoints/continents'

describe('endpoints > continents', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/continents', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/continents')

    fetchMock.addResponse([1, 2])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2])
  })

  it('test /v2/continents/1/floors', async () => {
    endpoint = endpoint.floors(1)

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/continents/1/floors')

    fetchMock.addResponse({texture_dims: [1, 2], clamed_view: [[1, 2]]})
    let content = await endpoint.get(42)
    expect(content.texture_dims).to.deep.equal([1, 2])
  })
})
