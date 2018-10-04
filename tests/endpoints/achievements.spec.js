/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/achievements')

describe('endpoints > achievements', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/achievements', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(false)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/achievements')

    fetchMock.addResponse({ id: 1, name: 'Centaur Slayer' })
    let content = await endpoint.get(1)
    expect(content.name).toEqual('Centaur Slayer')
  })

  it('test /v2/achievements/categories', async () => {
    endpoint = endpoint.categories()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/achievements/categories')

    fetchMock.addResponse({ id: 1, name: 'Slayer', order: 30, achievements: [1, 4, 5] })
    let content = await endpoint.get(1)
    expect(content.name).toEqual('Slayer')
  })

  it('test /v2/achievements/groups', async () => {
    endpoint = endpoint.groups()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(true)
    expect(endpoint.isLocalized).toEqual(true)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/achievements/groups')

    fetchMock.addResponse({ id: '65B4B678-607E-4D97-B458-076C3E96A810', name: 'Heart of Thorns' })
    let content = await endpoint.get('65B4B678-607E-4D97-B458-076C3E96A810')
    expect(content.name).toEqual('Heart of Thorns')
  })

  it('test /v2/achievements/daily', async () => {
    endpoint = endpoint.daily()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/achievements/daily')

    fetchMock.addResponse({ pve: [{ id: 1984, level: { min: 1, max: 80 } }] })
    let content = await endpoint.get()
    expect(content.pve[0].id).toEqual(1984)
  })

  it('test /v2/achievements/daily/tomorrow', async () => {
    endpoint = endpoint.dailyTomorrow()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/achievements/daily/tomorrow')

    fetchMock.addResponse({ pve: [{ id: 1984, level: { min: 1, max: 80 } }] })
    let content = await endpoint.get()
    expect(content.pve[0].id).toEqual(1984)
  })
})
