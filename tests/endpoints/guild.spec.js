/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('../mocks/requester.mock.js')

const Module = require('../../src/endpoints/guild.js')

describe('endpoints > guild', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v1/guild_details.json', async () => {
    expect(endpoint.url).to.equal('/v1/guild_details.json')

    reqMock.addResponse({guild_id: 'guid', guild_name: 'Baws Like'})
    let content = await endpoint.get()
    expect(content.guild_name).to.equal('Baws Like')
  })

  it('test /v2/guild/upgrades', async () => {
    endpoint = endpoint.upgrades()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/guild/upgrades')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/guild/permissions', async () => {
    endpoint = endpoint.permissions()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/guild/permissions')

    reqMock.addResponse(['ClaimableEditOptions', 'EditBGM'])
    let content = await endpoint.ids()
    expect(content).to.deep.equal(['ClaimableEditOptions', 'EditBGM'])
  })

  it('test /v2/guild/:id/stash', async () => {
    endpoint = endpoint.stash('test-uuid')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/test-uuid/stash')

    reqMock.addResponse([{upgrade_id: 58, size: 50, coins: 1337, inventory: [{id: 19684, count: 29}]}])
    let content = await endpoint.get()
    expect(content[0].coins).to.equal(1337)
  })

  it('test /v2/guild/:id/treasury', async () => {
    endpoint = endpoint.treasury('test-uuid')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/test-uuid/treasury')

    reqMock.addResponse([{id: 1337, count: 250}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal(1337)
  })

  it('test /v2/guild/:id/ranks', async () => {
    endpoint = endpoint.ranks('test-uuid')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/test-uuid/ranks')

    reqMock.addResponse([{id: 'Officer', order: 2, permissions: ['Admin']}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal('Officer')
  })

  it('test /v2/guild/:id/members', async () => {
    endpoint = endpoint.members('test-uuid')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/test-uuid/members')

    reqMock.addResponse([{name: 'Account.1234', rank: 'Leader'}])
    let content = await endpoint.get()
    expect(content[0].name).to.equal('Account.1234')
  })
})
