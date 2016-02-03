/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('requester/mock')

const Module = require('../../src/endpoints/maps.js')

describe('endpoints > maps', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/maps', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(false)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/maps')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3])
  })
})
