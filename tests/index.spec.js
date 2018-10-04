/* eslint-env jest */
const index = require('../src/index')
const Client = require('../src/client')

describe('index', () => {
  it('exports a function that returns a new client object', () => {
    expect(index()).toBeInstanceOf(Client)
  })
})
