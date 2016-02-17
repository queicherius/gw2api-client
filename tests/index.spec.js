/* eslint-env node, mocha */
const expect = require('chai').expect
const index = require('../src/index.js')

describe('index', () => {
  it('exports a function that returns a new client object', () => {
    expect(index).to.be.a.function
    expect(index()).to.be.an.instanceOf(require('../src/client.js'))
  })
})
