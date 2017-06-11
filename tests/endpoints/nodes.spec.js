/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/nodes'

describe('endpoints > nodes', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/nodes', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/nodes')

    fetchMock.addResponse({id: 'basic_ore_nodes'})
    let content = await endpoint.get('basic_ore_nodes')
    expect(content.id).to.equal('basic_ore_nodes')
  })
})
