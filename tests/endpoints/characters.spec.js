/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/characters')

describe('endpoints > characters', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/characters', async () => {
    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.supportsBulkAll).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters')

    fetchMock.addResponse(['Character Name'])
    let content = await endpoint.ids()
    expect(content).toEqual(['Character Name'])
  })

  it('test /v2/characters/:id/backstory', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).backstory()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/backstory')

    fetchMock.addResponse({ backstory: [1, 2, 3] })
    let content = await endpoint.get()
    expect(content).toEqual([1, 2, 3])
  })

  it('test /v2/characters/:id/core', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).core()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/core')

    fetchMock.addResponse({ name: 'Random Nâme', race: 'Asura' })
    let content = await endpoint.get()
    expect(content).toEqual({ name: 'Random Nâme', race: 'Asura' })
  })

  it('test /v2/characters/:id/crafting', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).crafting()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/crafting')

    fetchMock.addResponse({ crafting: [{ discipline: 'Artificer', rating: 50 }] })
    let content = await endpoint.get()
    expect(content).toEqual([{ discipline: 'Artificer', rating: 50 }])
  })

  it('test /v2/characters/:id/equipment', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).equipment()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/equipment')

    fetchMock.addResponse({ equipment: [{ id: 123, slot: 'Coat' }] })
    let content = await endpoint.get()
    expect(content[0].id).toEqual(123)
  })

  it('test /v2/characters/:id/heropoints', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).heropoints()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/heropoints')

    fetchMock.addResponse(['0-0', '0-2'])
    let content = await endpoint.get()
    expect(content).toEqual(['0-0', '0-2'])
  })

  it('test /v2/characters/:id/inventory', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).inventory()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/inventory')

    fetchMock.addResponse({ bags: [{ id: 123, size: 4, inventory: [null, { id: 123, count: 10 }] }] })
    let content = await endpoint.get()
    expect(content[0].id).toEqual(123)
  })

  it('test /v2/characters/:id/quests', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).quests()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/quests')

    fetchMock.addResponse([42, 40, 337, 295])
    let content = await endpoint.get()
    expect(content).toEqual([42, 40, 337, 295])
  })

  it('test /v2/characters/:id/recipes', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).recipes()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/recipes')

    fetchMock.addResponse({ recipes: [1, 2, 3] })
    let content = await endpoint.get()
    expect(content).toEqual([1, 2, 3])
  })

  it('test /v2/characters/:id/sab', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).sab()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/sab')

    fetchMock.addResponse({ zones: [{ id: 1, mode: 'tribulation' }] })
    let content = await endpoint.get()
    expect(content).toEqual({ zones: [{ id: 1, mode: 'tribulation' }] })
  })

  it('test /v2/characters/:id/skills', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).skills()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/skills')

    fetchMock.addResponse({ skills: { pve: { heal: 29535 } } })
    let content = await endpoint.get()
    expect(content.pve.heal).toEqual(29535)
  })

  it('test /v2/characters/:id/specializations', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).specializations()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/specializations')

    fetchMock.addResponse({ specializations: { pve: [{ id: 41, traits: [1, 2, 3] }] } })
    let content = await endpoint.get()
    expect(content.pve[0].id).toEqual(41)
  })

  it('test /v2/characters/:id/training', async () => {
    endpoint = (new Module(mockClient, 'Random Nâme')).training()

    expect(endpoint.isPaginated).toEqual(false)
    expect(endpoint.isBulk).toEqual(false)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(true)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/characters/Random%20N%C3%A2me/training')

    fetchMock.addResponse({ training: [{ id: 60, spent: 20, done: true }] })
    let content = await endpoint.get()
    expect(content).toEqual([{ id: 60, spent: 20, done: true }])
  })
})
