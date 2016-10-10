/* eslint-env node, mocha */
import {expect} from 'chai'
import {chunk, unique, flatten} from '../src/helpers'

describe('helpers', () => {
  it('chunks into correct pieces', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).to.deep.equal([[1, 2], [3, 4], [5]])
    expect(chunk([1, 2, 3], 10)).to.deep.equal([[1, 2, 3]])
  })

  it('only filters out unique entries', () => {
    expect(unique([])).to.deep.equal([])
    expect(unique([1, 2, 3])).to.deep.equal([1, 2, 3])
    expect(unique([1, 1, 2])).to.deep.equal([1, 2])
  })

  it('flattens an array into a one dimensional array', () => {
    expect(flatten([[], []])).to.deep.equal([])
    expect(flatten([[1, 2], [3]])).to.deep.equal([1, 2, 3])
  })
})
