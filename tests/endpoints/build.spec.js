/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/build.js')

describe('endpoints > build', () => {
  var endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/build', async () => {
    reqMock.addResponse({'id': 1337})

    let id = await endpoint.get()

    expect(reqMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/build')
    expect(id).to.equal(1337)
  })
})
