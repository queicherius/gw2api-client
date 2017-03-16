/* eslint-env node, mocha */
import { expect } from 'chai'
import index from '../src/index'
import Client from '../src/client'

describe('index', () => {
  it('exports a function that returns a new client object', () => {
    expect(index()).to.be.an.instanceOf(Client)
  })
})
