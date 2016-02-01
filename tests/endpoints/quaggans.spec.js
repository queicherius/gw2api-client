/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/quaggans.js')

describe('endpoints > quaggans', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/quaggans', async () => {
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.url).to.equal('/v2/quaggans')

    reqMock.addResponse({id: 'cheer', url: 'https://.../cheer.jpg'})
    let content = await endpoint.get('cheer')
    expect(content.id).to.equal('cheer')
  })
})
