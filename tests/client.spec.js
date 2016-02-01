/* eslint-env node, mocha */
const expect = require('chai').expect
const module = require('../src/client.js')

describe('client', () => {
  var client
  beforeEach(() => {
    client = new module()
  })

  it('can set a language', () => {
    let x = client.language('de')
    expect(client.lang).to.equal('de')
    expect(x).to.be.an.instanceof(module)
  })

  it('can set an api key', () => {
    let x = client.authenticate('key')
    expect(client.apiKey).to.equal('key')
    expect(x).to.be.an.instanceof(module)
  })

  it('can get the account endpoint', () => {
    let endpoint = client.account()
    expect(endpoint.url).to.equal('/v2/account')
  })

  it('can get the achievements endpoint', () => {
    let endpoint = client.achievements()
    expect(endpoint.url).to.equal('/v2/achievements')
  })

  it('can get the build endpoint', () => {
    let endpoint = client.build()
    expect(endpoint.url).to.equal('/v2/build')
  })

  it('can get the characters endpoint', () => {
    let endpoint = client.characters()
    expect(endpoint.url).to.equal('/v2/characters')
  })

  it('can get the colors endpoint', () => {
    let endpoint = client.colors()
    expect(endpoint.url).to.equal('/v2/colors')
  })

  it('can get the commerce endpoint', () => {
    let endpoint = client.commerce()
    expect(endpoint.exchange).to.exist
  })

  it('can get the continents endpoint', () => {
    let endpoint = client.continents()
    expect(endpoint.url).to.equal('/v2/continents')
  })

  it('can get the currencies endpoint', () => {
    let endpoint = client.currencies()
    expect(endpoint.url).to.equal('/v2/currencies')
  })

  it('can get the emblem endpoint', () => {
    let endpoint = client.emblem()
    expect(endpoint.backgrounds).to.exist
  })

  it('can get the events endpoint', () => {
    let endpoint = client.events()
    expect(endpoint.url).to.equal('/v1/event_details.json')
  })

  it('can get the files endpoint', () => {
    let endpoint = client.files()
    expect(endpoint.url).to.equal('/v2/files')
  })

  it('can get the guild endpoint', () => {
    let endpoint = client.guild()
    expect(endpoint.url).to.equal('/v1/guild_details.json')
  })

  it('can get the items endpoint', () => {
    let endpoint = client.items()
    expect(endpoint.url).to.equal('/v2/items')
  })

  it('can get the maps endpoint', () => {
    let endpoint = client.maps()
    expect(endpoint.url).to.equal('/v2/maps')
  })

  it('can get the materials endpoint', () => {
    let endpoint = client.materials()
    expect(endpoint.url).to.equal('/v2/materials')
  })

  it('can get the minis endpoint', () => {
    let endpoint = client.minis()
    expect(endpoint.url).to.equal('/v2/minis')
  })

  it('can get the pvp endpoint', () => {
    let endpoint = client.pvp()
    expect(endpoint.games).to.exist
  })

  it('can get the quaggans endpoint', () => {
    let endpoint = client.quaggans()
    expect(endpoint.url).to.equal('/v2/quaggans')
  })

  it('can get the recipes endpoint', () => {
    let endpoint = client.recipes()
    expect(endpoint.url).to.equal('/v2/recipes')
  })

  it('can get the skins endpoint', () => {
    let endpoint = client.skins()
    expect(endpoint.url).to.equal('/v2/skins')
  })

  it('can get the specializations endpoint', () => {
    let endpoint = client.specializations()
    expect(endpoint.url).to.equal('/v2/specializations')
  })

  it('can get the tokeninfo endpoint', () => {
    let endpoint = client.tokeninfo()
    expect(endpoint.url).to.equal('/v2/tokeninfo')
  })

  it('can get the traits endpoint', () => {
    let endpoint = client.traits()
    expect(endpoint.url).to.equal('/v2/traits')
  })

  it('can get the worlds endpoint', () => {
    let endpoint = client.worlds()
    expect(endpoint.url).to.equal('/v2/worlds')
  })

  it('can get the wvw endpoint', () => {
    let endpoint = client.wvw()
    expect(endpoint.matches).to.exist
  })
})
