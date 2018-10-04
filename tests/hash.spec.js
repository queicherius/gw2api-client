/* eslint-env jest */
const hash = require('../src/hash')

describe('hash', () => {
  it('creates a hash of a string', () => {
    expect(hash('something')).toEqual('crsxd7')
    expect(hash('something2')).toEqual('nx0tr4')
  })

  it('only calls the underlying hashing function once per value', () => {
    const emotionHashMock = jest.fn().mockReturnValue('HASH')
    hash.__set__('emotionHash', emotionHashMock)

    expect(hash('something3')).toEqual('HASH')
    expect(hash('something3')).toEqual('HASH')
    expect(emotionHashMock.mock.calls.length).toEqual(1)
  })
})
