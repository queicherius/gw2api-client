/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('gw2e-requester/mock')

const Module = require('../../src/endpoints/stories.js')

describe('endpoints > stories', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/stories', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/stories')

    reqMock.addResponse({id: 1, name: 'My Story'})
    let content = await endpoint.get(1)
    expect(content.name).to.equal('My Story')
  })

  it('test /v2/stories/seasons', async () => {
    endpoint = endpoint.seasons()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/stories/seasons')

    reqMock.addResponse({id: 'S0ME-UU1D', name: 'Scarlet\'s War'})
    let content = await endpoint.get('S0ME-UU1D')
    expect(content.name).to.equal('Scarlet\'s War')
  })
})
