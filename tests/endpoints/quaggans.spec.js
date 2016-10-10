/* eslint-env node, mocha */
import {expect} from 'chai'
import {mockClient, fetchMock} from '../mocks/client.mock'
import Module from '../../src/endpoints/quaggans'

describe('endpoints > quaggans', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/quaggans', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/quaggans')

    fetchMock.addResponse({id: 'cheer', url: 'https://.../cheer.jpg'})
    let content = await endpoint.get('cheer')
    expect(content.id).to.equal('cheer')
  })
})
