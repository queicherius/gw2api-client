/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/emblem.js')

describe('endpoints > emblem', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/emblem/backgrounds', async () => {
    endpoint = endpoint.backgrounds()
    endpoint.requester = reqMock

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
    endpoint.requester = reqMock

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
