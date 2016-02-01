/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/worlds.js')

describe('endpoints > worlds', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/worlds', async () => {
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.url).to.equal('/v2/worlds')

    reqMock.addResponse([{id: 1001, name: 'Anvil Rock'}])
    let content = await endpoint.many([1001])
    expect(content[0].name).to.equal('Anvil Rock')
  })
})
