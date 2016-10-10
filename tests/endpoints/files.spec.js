/* eslint-env node, mocha */
import {expect} from 'chai'
import {mockClient, fetchMock} from '../mocks/client.mock'
import Module from '../../src/endpoints/files'

describe('endpoints > files', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/files', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/files')

    fetchMock.addResponse(['map_complete', 'map_dungeon', 'map_heart_empty'])
    let content = await endpoint.ids()
    expect(content[0]).to.equal('map_complete')
  })
})
