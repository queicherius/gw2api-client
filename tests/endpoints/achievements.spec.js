/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const module = require('../../src/endpoints/achievements.js')

describe('endpoints > achievements', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/achievements', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(false)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/achievements')

    reqMock.addResponse({id: 1, name: 'Centaur Slayer'})
    let content = await endpoint.get(1)
    expect(content.name).to.equal('Centaur Slayer')
  })

  it('test /v2/achievements/categories', async () => {
    endpoint = endpoint.categories()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/achievements/categories')

    reqMock.addResponse({id: 50, name: 'Twilight Assault', order: 0, achievements: [947]})
    let content = await endpoint.get(50)
    expect(content.name).to.equal('Twilight Assault')
  })

  it('test /v2/achievements/groups', async () => {
    endpoint = endpoint.groups()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/achievements/groups')

    reqMock.addResponse({id: '65B4B678-607E-4D97-B458-076C3E96A810', name: 'Heart of Thorns'})
    let content = await endpoint.get('65B4B678-607E-4D97-B458-076C3E96A810')
    expect(content.name).to.equal('Heart of Thorns')
  })

  it('test /v2/achievements/daily', async () => {
    endpoint = endpoint.daily()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)

    expect(endpoint.url).to.equal('/v2/achievements/daily')

    reqMock.addResponse({pve: [{id: 1984, level: {min: 1, max: 80}}]})
    let content = await endpoint.get()
    expect(content.pve[0].id).to.equal(1984)
  })
})
