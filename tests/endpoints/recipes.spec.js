/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/recipes.js')

describe('endpoints > recipes', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/recipes', async () => {
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.url).to.equal('/v2/recipes')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/recipes/search (input)', async () => {
    endpoint = endpoint.search()
    endpoint.requester = reqMock

    expect(endpoint.url).to.equal('/v2/recipes/search')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.input(123)
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/recipes/search (output)', async () => {
    endpoint = endpoint.search()
    endpoint.requester = reqMock

    expect(endpoint.url).to.equal('/v2/recipes/search')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.output(123)
    expect(content).to.deep.equal([1, 2, 3])
  })
})
