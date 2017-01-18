/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/recipes'

describe('endpoints > recipes', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/recipes', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/recipes')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/recipes/search (input)', async () => {
    endpoint = endpoint.search()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/recipes/search')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.input(123)
    expect(content).to.deep.equal([1, 2, 3])
    expect(fetchMock.lastUrl()).contains('/v2/recipes/search?input=123')
  })

  it('test /v2/recipes/search (output)', async () => {
    endpoint = endpoint.search()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/recipes/search')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.output(123)
    expect(content).to.deep.equal([1, 2, 3])
    expect(fetchMock.lastUrl()).contains('/v2/recipes/search?output=123')
  })
})
