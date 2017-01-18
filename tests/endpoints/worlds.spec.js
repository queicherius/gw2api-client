/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/worlds'

describe('endpoints > worlds', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/worlds', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/worlds')

    fetchMock.addResponse([{id: 1001, name: 'Anvil Rock'}])
    let content = await endpoint.many([1001])
    expect(content[0].name).to.equal('Anvil Rock')
  })
})
