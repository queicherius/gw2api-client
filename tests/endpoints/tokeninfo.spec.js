/* eslint-env node, mocha */
import {expect} from 'chai'
import {mockClient, fetchMock} from '../mocks/client.mock'
import Module from '../../src/endpoints/tokeninfo'

describe('endpoints > tokeninfo', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/tokeninfo', async () => {
    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/tokeninfo')

    fetchMock.addResponse({id: 'uuid', name: 'public key', permissions: ['account']})
    let content = await endpoint.get()
    expect(content.name).to.equal('public key')
  })
})
