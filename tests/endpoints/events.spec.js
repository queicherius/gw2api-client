/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('gw2e-requester/mock')
const rewire = require('rewire')

const Module = rewire('../../src/endpoints/events.js')

describe('endpoints > events', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('transforms the v1 format into v2', () => {
    let transformer = Module.__get__('transformV1Format')
    let content = transformer({events: {
      'uuid-one': {name: 'Defeat elite'},
      'uuid-two': {name: 'Defeat champion'}
    }})
    expect(content).to.deep.equal([
      {id: 'uuid-one', name: 'Defeat elite'},
      {id: 'uuid-two', name: 'Defeat champion'}
    ])
  })

  it('test /v1/event_details.json (all)', async () => {
    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v1/event_details.json')

    reqMock.addResponse({events: {
      'uuid-one': {name: 'Defeat elite'},
      'uuid-two': {name: 'Defeat champion'}
    }})
    let content = await endpoint.all()
    expect(content.length).to.equal(2)
    expect(content[0].name).to.equal('Defeat elite')
  })

  it('test /v1/event_details.json (get)', async () => {
    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v1/event_details.json')

    reqMock.addResponse({events: {
      'uuid-one': {name: 'Defeat elite'}
    }})
    let content = await endpoint.get('uuid-one')
    expect(content.name).to.equal('Defeat elite')
  })
})
