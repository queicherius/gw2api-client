/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('gw2e-requester/mock')

const Module = require('../../src/endpoints/guild.js')

describe('endpoints > guild', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(false)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  it('test /v2/guild', async () => {
    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.isOptionallyAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild')

    reqMock.addResponse({id: 'guid', name: 'Baws Like', tag: 'BAWS'})
    let content = await endpoint.get()
    expect(content.name).to.equal('Baws Like')
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

  it('test /v2/guild/search', async () => {
    endpoint = endpoint.search('Baws Like')
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.url).to.equal('/v2/guild/search?name=Baws%20Like')

    reqMock.addResponse(['F8CDF1E0-2D64-4D71-81E2-049B0796B7AE'])
    let content = await endpoint.get()
    expect(content).to.equal('F8CDF1E0-2D64-4D71-81E2-049B0796B7AE')
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

  it('test /v2/guild/:id/log', async () => {
    endpoint = (new Module(false, 'S0ME-UU1D')).log()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/log')

    reqMock.addResponse([{id: 123, user: 'Account.1234', type: 'upgrade'}])
    let content = await endpoint.get()
    expect(content[0].user).to.equal('Account.1234')
  })

  it('test /v2/guild/:id/members', async () => {
    endpoint = (new Module(false, 'S0ME-UU1D')).members()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/members')

    reqMock.addResponse([{name: 'Account.1234', rank: 'Leader'}])
    let content = await endpoint.get()
    expect(content[0].name).to.equal('Account.1234')
  })

  it('test /v2/guild/:id/ranks', async () => {
    endpoint = (new Module(false, 'S0ME-UU1D')).ranks()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/ranks')

    reqMock.addResponse([{id: 'Officer', order: 2, permissions: ['Admin']}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal('Officer')
  })

  it('test /v2/guild/:id/stash', async () => {
    endpoint = (new Module(false, 'S0ME-UU1D')).stash()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/stash')

    reqMock.addResponse([{upgrade_id: 58, size: 50, coins: 1337, inventory: [{id: 19684, count: 29}]}])
    let content = await endpoint.get()
    expect(content[0].coins).to.equal(1337)
  })

  it('test /v2/guild/:id/teams', async () => {
    endpoint = (new Module(false, 'S0ME-UU1D')).teams()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/teams')

    reqMock.addResponse([{id: 1, name: 'Gimme That Guild Hall Pls'}])
    let content = await endpoint.get()
    expect(content[0].name).to.equal('Gimme That Guild Hall Pls')
  })

  it('test /v2/guild/:id/treasury', async () => {
    endpoint = (new Module(false, 'S0ME-UU1D')).treasury()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/treasury')

    reqMock.addResponse([{id: 1337, count: 250}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal(1337)
  })

  it('test /v2/guild/:id/upgrades', async () => {
    endpoint = (new Module(false, 'S0ME-UU1D')).upgrades()
    endpoint.requester = reqMock

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/upgrades')

    reqMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })
})
