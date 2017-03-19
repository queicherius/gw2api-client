/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../src/endpoints/guild'

describe('endpoints > guild', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/guild', async () => {
    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.isOptionallyAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild')

    fetchMock.addResponse({id: 'S0ME-UU1D', name: 'Baws Like', tag: 'BAWS'})
    let content = await endpoint.get('S0ME-UU1D')
    expect(content.name).to.equal('Baws Like')
    expect(fetchMock.lastUrl()).to.contain('/v2/guild/S0ME-UU1D')
  })

  it('test /v2/guild/permissions', async () => {
    endpoint = endpoint.permissions()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/permissions')

    fetchMock.addResponse(['ClaimableEditOptions', 'EditBGM'])
    let content = await endpoint.ids()
    expect(content).to.deep.equal(['ClaimableEditOptions', 'EditBGM'])
  })

  it('test /v2/guild/search', async () => {
    endpoint = endpoint.search()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/search')

    fetchMock.addResponse(['F8CDF1E0-2D64-4D71-81E2-049B0796B7AE'])
    let content = await endpoint.name('Baws Like')
    expect(content).to.equal('F8CDF1E0-2D64-4D71-81E2-049B0796B7AE')
    expect(fetchMock.lastUrl()).contains('/v2/guild/search?name=Baws%20Like')
  })

  it('test /v2/guild/upgrades', async () => {
    endpoint = endpoint.upgrades()

    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/upgrades')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3])
  })

  it('test /v2/guild/:id/log', async () => {
    endpoint = (new Module(mockClient, 'S0ME-UU1D')).log()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/log')

    fetchMock.addResponse([{id: 123, user: 'Account.1234', type: 'upgrade'}])
    let content = await endpoint.get()
    expect(content[0].user).to.equal('Account.1234')
  })

  it('test /v2/guild/:id/members', async () => {
    endpoint = (new Module(mockClient, 'S0ME-UU1D')).members()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/members')

    fetchMock.addResponse([{name: 'Account.1234', rank: 'Leader'}])
    let content = await endpoint.get()
    expect(content[0].name).to.equal('Account.1234')
  })

  it('test /v2/guild/:id/ranks', async () => {
    endpoint = (new Module(mockClient, 'S0ME-UU1D')).ranks()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/ranks')

    fetchMock.addResponse([{id: 'Officer', order: 2, permissions: ['Admin']}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal('Officer')
  })

  it('test /v2/guild/:id/stash', async () => {
    endpoint = (new Module(mockClient, 'S0ME-UU1D')).stash()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/stash')

    fetchMock.addResponse([{upgrade_id: 58, size: 50, coins: 1337, inventory: [{id: 19684, count: 29}]}])
    let content = await endpoint.get()
    expect(content[0].coins).to.equal(1337)
  })

  it('test /v2/guild/:id/storage', async () => {
    endpoint = (new Module(mockClient, 'S0ME-UU1D')).storage()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/storage')

    fetchMock.addResponse([{id: 42, count: 100}, {id: 9, count: 3}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal(42)
  })

  it('test /v2/guild/:id/teams', async () => {
    endpoint = (new Module(mockClient, 'S0ME-UU1D')).teams()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/teams')

    fetchMock.addResponse([{id: 1, name: 'Gimme That Guild Hall Pls'}])
    let content = await endpoint.get()
    expect(content[0].name).to.equal('Gimme That Guild Hall Pls')
  })

  it('test /v2/guild/:id/treasury', async () => {
    endpoint = (new Module(mockClient, 'S0ME-UU1D')).treasury()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/treasury')

    fetchMock.addResponse([{id: 1337, count: 250}])
    let content = await endpoint.get()
    expect(content[0].id).to.equal(1337)
  })

  it('test /v2/guild/:id/upgrades', async () => {
    endpoint = (new Module(mockClient, 'S0ME-UU1D')).upgrades()

    expect(endpoint.isPaginated).to.equal(false)
    expect(endpoint.isBulk).to.equal(false)
    expect(endpoint.isLocalized).to.equal(false)
    expect(endpoint.isAuthenticated).to.equal(true)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/guild/S0ME-UU1D/upgrades')

    fetchMock.addResponse([1, 2, 3])
    let content = await endpoint.get()
    expect(content).to.deep.equal([1, 2, 3])
  })
})
