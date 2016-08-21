/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('gw2e-requester/mock')

const Module = require('../../src/endpoints/characters.js')

describe('endpoints > characters', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/characters', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters')

    reqMock.addResponse(['Character Name'])
    let content = await endpoint.ids()
    expect(content).to.deep.equal(['Character Name'])
  })

  it('test /v2/characters/:id/backstory', async () => {
    endpoint = endpoint.backstory('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/backstory')

    reqMock.addResponse({backstory: [1, 2, 3]})
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/characters/:id/core', async () => {
    endpoint = endpoint.core('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/core')

    reqMock.addResponse({name: 'Nâme', race: 'Asura'})
    let content = await endpoint.get()
    expect(content).to.deep.equal({name: 'Nâme', race: 'Asura'})
  })

  it('test /v2/characters/:id/crafting', async () => {
    endpoint = endpoint.crafting('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/crafting')

    reqMock.addResponse({crafting: [{discipline: 'Artificer', rating: 50}]})
    let content = await endpoint.get()
    expect(content).to.deep.equal([{discipline: 'Artificer', rating: 50}])
  })

  it('test /v2/characters/:id/equipment', async () => {
    endpoint = endpoint.equipment('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/equipment')

    reqMock.addResponse({equipment: [{id: 123, slot: 'Coat'}]})
    let content = await endpoint.get()
    expect(content[0].id).to.equal(123)
  })

  it('test /v2/characters/:id/heropoints', async () => {
    endpoint = endpoint.heropoints('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/heropoints')

    reqMock.addResponse(['0-0', '0-2'])
    let content = await endpoint.get()
    expect(content).to.deep.equal(['0-0', '0-2'])
  })

  it('test /v2/characters/:id/inventory', async () => {
    endpoint = endpoint.inventory('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/inventory')

    reqMock.addResponse({bags: [{id: 123, size: 4, inventory: [null, {id: 123, count: 10}]}]})
    let content = await endpoint.get()
    expect(content[0].id).to.equal(123)
  })

  it('test /v2/characters/:id/recipes', async () => {
    endpoint = endpoint.recipes('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/recipes')

    reqMock.addResponse({recipes: [1, 2, 3]})
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/characters/:id/specializations', async () => {
    endpoint = endpoint.specializations('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/specializations')

    reqMock.addResponse({specializations: {pve: [{id: 41, traits: [1, 2, 3]}]}})
    let content = await endpoint.get()
    expect(content.pve[0].id).to.equal(41)
  })

  it('test /v2/characters/:id/training', async () => {
    endpoint = endpoint.training('Nâme')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/characters/N%C3%A2me/training')

    reqMock.addResponse({training: [{id: 60, spent: 20, done: true}]})
    let content = await endpoint.get()
    expect(content).to.deep.equal([{id: 60, spent: 20, done: true}])
  })
})
