/* eslint-env node, mocha */
import {expect} from 'chai'
import {chunk, flatten, sortByIdList} from '../src/helpers'

describe('helpers', () => {
  it('chunks into correct pieces', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).to.deep.equal([[1, 2], [3, 4], [5]])
    expect(chunk([1, 2, 3], 10)).to.deep.equal([[1, 2, 3]])
  })

  it('flattens an array into a one dimensional array', () => {
    expect(flatten([[], []])).to.deep.equal([])
    expect(flatten([[1, 2], [3]])).to.deep.equal([1, 2, 3])
  })

  it('guarantees the element order for bulk results', () => {
    expect(sortByIdList([], [])).to.deep.equal([])
    expect(sortByIdList([{id: 2}, {id: 1}, {id: 3}], [1, 2, 3]))
      .to.deep.equal([{id: 1}, {id: 2}, {id: 3}])
  })
})
