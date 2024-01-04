/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/emotes')

describe('endpoints > emotes', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/emotes', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/emotes')

    fetchMock.addResponse({
      id: 'Shiverplus',
      commands: ['/shiverplus'],
      unlock_items: [93739]
    })
    let content = await endpoint.get('Shiverplus')
    expect(content.commands).toEqual(['/shiverplus'])
  })
})
