/* eslint-env jest */
import index from '../src/index'
import Client from '../src/client'

describe('index', () => {
  it('exports a function that returns a new client object', () => {
    expect(index()).toBeInstanceOf(Client)
  })
})
