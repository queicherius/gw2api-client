/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const Module = require('../../src/endpoints/quaggans.js')

describe('endpoints > quaggans', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/quaggans', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/quaggans')

    reqMock.addResponse({id: 'cheer', url: 'https://.../cheer.jpg'})
    let content = await endpoint.get('cheer')
    expect(content.id).to.equal('cheer')
  })
})
