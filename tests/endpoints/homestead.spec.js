/* eslint-env jest */
const { mockClient, fetchMock } = require('../mocks/client.mock')
const Module = require('../../src/endpoints/homestead')

describe('endpoints > homestead', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/homestead/decorations', async () => {
    endpoint = endpoint.decorations()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/homestead/decorations')

    fetchMock.addResponse({
      id: 35,
      name: 'Kodan Cottage Wall',
      description: '',
      categories: [19, 1],
      max_count: 250,
      icon: 'https://render.guildwars2.com/file/EBBA1865F40A0E6EFBCACA609271191E6E9CDDCF/3375022.png'
    })

    let content = await endpoint.get(35)
    expect(content.name).toEqual('Kodan Cottage Wall')
  })

  it('test /v2/homestead/glyphs', async () => {
    endpoint = endpoint.glyphs()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/homestead/glyphs')

    fetchMock.addResponse({
      id: 'volatility_harvesting'
    })

    let content = await endpoint.get('volatility_harvesting')
    expect(content.id).toEqual('volatility_harvesting')
  })

  it('test /v2/homestead/decorations/categories', async () => {
    endpoint = endpoint.decorations().categories()

    expect(endpoint.isPaginated).toEqual(true)
    expect(endpoint.isBulk).toEqual(true)
    expect(endpoint.isLocalized).toEqual(false)
    expect(endpoint.isAuthenticated).toEqual(false)
    expect(endpoint.cacheTime).not.toEqual(undefined)
    expect(endpoint.url).toEqual('/v2/homestead/decorations/categories')

    fetchMock.addResponse({
      id: 1,
      name: 'Architecture'
    })

    let content = await endpoint.get(1)
    expect(content.name).toEqual('Architecture')
  })
})
