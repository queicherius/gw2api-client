/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/events')

describe('endpoints > events', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
    endpoint.schema('schema')
  })

  it('transforms the v1 format into v2', () => {
    let transformer = Module.__get__('transformV1Format')
    let content = transformer({
      events: {
        'uuid-one': { name: 'Defeat elite' },
        'uuid-two': { name: 'Defeat champion' }
      }
    })
    expect(content).toEqual([
      { id: 'uuid-one', name: 'Defeat elite' },
      { id: 'uuid-two', name: 'Defeat champion' }
    ])
  })

  it('test /v1/event_details.json (all)', async () => {
    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v1/event_details.json')

    fetchMock.addResponse({
      events: {
        'uuid-one': { name: 'Defeat elite' },
        'uuid-two': { name: 'Defeat champion' }
      }
    })
    let content = await endpoint.all()
    expect(content.length).toEqual(2)
    expect(content[0].name).toEqual('Defeat elite')
  })

  it('test /v1/event_details.json (get)', async () => {
    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v1/event_details.json')

    fetchMock.addResponse({
      events: {
        'uuid-one': { name: 'Defeat elite' }
      }
    })
    let content = await endpoint.get('uuid-one')
    expect(content.name).toEqual('Defeat elite')
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining('/v1/event_details.json?v=schema&event_id=uuid-one'))
  })
})
