/* eslint-env node, mocha */
import {expect} from 'chai'
import {mockClient, fetchMock} from '../mocks/client.mock'
import Module from '../../src/endpoints/emblem'

describe('endpoints > emblem', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/emblem/backgrounds', async () => {
    endpoint = endpoint.backgrounds()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/emblem/backgrounds')

    fetchMock.addResponse({id: 1, layers: ['1.png', '2.png']})
    let content = await endpoint.get(1)
    expect(content.id).to.equal(1)
  })

  it('test /v2/emblem/foregrounds', async () => {
    endpoint = endpoint.foregrounds()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/emblem/foregrounds')

    fetchMock.addResponse({id: 1, layers: ['1.png', '2.png']})
    let content = await endpoint.get(1)
    expect(content.id).to.equal(1)
  })
})
