/* eslint-env node, mocha */
const expect = require('chai').expect
const {mockClient, reqMock} = require('../mocks/client.mock.js')
const Module = require('../../src/endpoints/professions.js')

describe('endpoints > professions', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    reqMock.reset()
  })

  it('test /v2/professions', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/professions')

    reqMock.addResponse({id: 'Guardian', name: 'Guardian'})
    let content = await endpoint.get('Guardian')
    expect(content.name).to.equal('Guardian')
  })
})
