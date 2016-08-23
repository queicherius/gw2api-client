/* eslint-env node, mocha */
const expect = require('chai').expect
const {mockClient, reqMock} = require('../mocks/client.mock.js')
const Module = require('../../src/endpoints/continents.js')

describe('endpoints > continents', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    reqMock.reset()
  })

  it('test /v2/continents', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/continents')

    reqMock.addResponse([1, 2])
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
    expect(endpoint.url).to.equal('/v2/continents/1/floors')

    reqMock.addResponse({texture_dims: [1, 2], clamed_view: [[1, 2]]})
    let content = await endpoint.get(42)
    expect(content.texture_dims).to.deep.equal([1, 2])
  })
})
