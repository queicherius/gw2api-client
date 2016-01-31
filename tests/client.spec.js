/* eslint-env node, mocha */
const expect = require('chai').expect
const module = require('../src/client.js')

var client
beforeEach(() => {
  client = new module()
})

describe('client', () => {
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
})
