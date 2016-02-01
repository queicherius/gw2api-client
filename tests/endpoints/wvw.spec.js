/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/wvw.js')

describe('endpoints > wvw', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/wvw/matches', async () => {
    endpoint = endpoint.matches()
    endpoint.requester = reqMock

    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.url).to.equal('/v2/wvw/matches')

    reqMock.addResponse({id: '2-6', scores: {red: 123, blue: 456, green: 789}})
    let content = await endpoint.get('2-6')
    expect(content.scores.red).to.equal(123)
  })

  it('test /v2/wvw/objectives', async () => {
    endpoint = endpoint.objectives()
    endpoint.requester = reqMock

    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.url).to.equal('/v2/wvw/objectives')

    reqMock.addResponse([{id: '968-98', name: 'Wurm Tunnel'}])
    let content = await endpoint.many(['968-98'])
    expect(content[0].name).to.equal('Wurm Tunnel')
  })
})
