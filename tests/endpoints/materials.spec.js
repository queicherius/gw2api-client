/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/materials.js')

describe('endpoints > materials', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/materials', async () => {
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.url).to.equal('/v2/materials')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3])
  })
})
