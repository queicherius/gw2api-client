/* eslint-env node, mocha */
const expect = require('chai').expect
const {mockClient, reqMock} = require('../mocks/client.mock.js')
const Module = require('../../src/endpoints/backstory.js')

describe('endpoints > backstory', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    reqMock.reset()
  })

  it('test /v2/backstory/answers', async () => {
    endpoint = endpoint.answers()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/backstory/answers')

    reqMock.addResponse({id: 1, title: 'Fern Hound'})
    let content = await endpoint.get(1)
    expect(content.title).to.equal('Fern Hound')
  })

  it('test /v2/backstory/questions', async () => {
    endpoint = endpoint.questions()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/backstory/questions')

    reqMock.addResponse({id: 1, title: 'My Personality'})
    let content = await endpoint.get(1)
    expect(content.title).to.equal('My Personality')
  })
})
