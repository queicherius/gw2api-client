/* eslint-env node, mocha */
const expect = require('chai').expect
const module = require('../src/helpers.js')

describe('helpers', () => {
  it('chunks into correct pieces', () => {
    expect(module.chunk([1, 2, 3, 4, 5], 2)).to.deep.equal([[1, 2], [3, 4], [5]])
    expect(module.chunk([1, 2, 3], 10)).to.deep.equal([[1, 2, 3]])
  })

  it('only filters out unique entries', () => {
    expect(module.unique([])).to.deep.equal([])
    expect(module.unique([1, 2, 3])).to.deep.equal([1, 2, 3])
    expect(module.unique([1, 1, 2])).to.deep.equal([1, 2])
  })

  it('flattens an array into a one dimensional array', () => {
    expect(module.flatten([[], []])).to.deep.equal([])
    expect(module.flatten([[1, 2], [3]])).to.deep.equal([1, 2, 3])
  })
})
