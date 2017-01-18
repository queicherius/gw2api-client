/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/achievements'

describe('endpoints > achievements', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/achievements', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(false)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/achievements')

    fetchMock.addResponse({id: 1, name: 'Centaur Slayer'})
    let content = await endpoint.get(1)
    expect(content.name).to.equal('Centaur Slayer')
  })

  it('test /v2/achievements/categories', async () => {
    endpoint = endpoint.categories()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/achievements/categories')

    fetchMock.addResponse({id: 1, name: 'Slayer', order: 30, achievements: [1, 4, 5]})
    let content = await endpoint.get(1)
    expect(content.name).to.equal('Slayer')
  })

  it('test /v2/achievements/groups', async () => {
    endpoint = endpoint.groups()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/achievements/groups')

    fetchMock.addResponse({id: '65B4B678-607E-4D97-B458-076C3E96A810', name: 'Heart of Thorns'})
    let content = await endpoint.get('65B4B678-607E-4D97-B458-076C3E96A810')
    expect(content.name).to.equal('Heart of Thorns')
  })

  it('test /v2/achievements/daily', async () => {
    endpoint = endpoint.daily()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/achievements/daily')

    fetchMock.addResponse({pve: [{id: 1984, level: {min: 1, max: 80}}]})
    let content = await endpoint.get()
    expect(content.pve[0].id).to.equal(1984)
  })

  it('test /v2/achievements/daily/tomorrow', async () => {
    endpoint = endpoint.dailyTomorrow()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.be.undefined
    expect(endpoint.url).to.equal('/v2/achievements/daily/tomorrow')

    fetchMock.addResponse({pve: [{id: 1984, level: {min: 1, max: 80}}]})
    let content = await endpoint.get()
    expect(content.pve[0].id).to.equal(1984)
  })
})
