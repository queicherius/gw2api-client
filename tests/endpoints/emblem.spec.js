/* eslint-env node, mocha */
const expect = require('chai').expect
const {mockClient, reqMock} = require('../mocks/client.mock.js')
const Module = require('../../src/endpoints/emblem.js')

describe('endpoints > emblem', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    reqMock.reset()
  })

  it('test /v2/emblem/backgrounds', async () => {
    endpoint = endpoint.backgrounds()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/emblem/backgrounds')

    reqMock.addResponse({id: 1, layers: ['1.png', '2.png']})
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
    expect(endpoint.url).to.equal('/v2/emblem/foregrounds')

    reqMock.addResponse({id: 1, layers: ['1.png', '2.png']})
    let content = await endpoint.get(1)
    expect(content.id).to.equal(1)
  })
})
