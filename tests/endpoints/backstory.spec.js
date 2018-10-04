/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/backstory')

describe('endpoints > backstory', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/backstory/answers', async () => {
    endpoint = endpoint.answers()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/backstory/answers')

    fetchMock.addResponse({ id: 1, title: 'Fern Hound' })
    let content = await endpoint.get(1)
    expect(content.title).toEqual('Fern Hound')
  })

  it('test /v2/backstory/questions', async () => {
    endpoint = endpoint.questions()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/backstory/questions')

    fetchMock.addResponse({ id: 1, title: 'My Personality' })
    let content = await endpoint.get(1)
    expect(content.title).toEqual('My Personality')
  })
})
