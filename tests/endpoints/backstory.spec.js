/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/backstory'

describe('endpoints > backstory', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/backstory/answers', async () => {
    endpoint = endpoint.answers()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/backstory/answers')

    fetchMock.addResponse({id: 1, title: 'Fern Hound'})
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
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/backstory/questions')

    fetchMock.addResponse({id: 1, title: 'My Personality'})
    let content = await endpoint.get(1)
    expect(content.title).to.equal('My Personality')
  })
})
