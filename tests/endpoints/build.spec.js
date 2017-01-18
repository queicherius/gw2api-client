/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/build'

describe('endpoints > build', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/build', async () => {
    fetchMock.addResponse({id: 1337})

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/build')

    let id = await endpoint.get()
    expect(id).to.equal(1337)
  })
})
