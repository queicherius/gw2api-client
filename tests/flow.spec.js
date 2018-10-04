/* eslint-env jest */
const flow = require('../src/flow')

describe('flow', () => {
  it('handles parallel promises with an object', async () => {
    const result = await flow.parallel({
      a: () => Promise.resolve('AAA'),
      b: () => Promise.resolve('BBB')
    })

    expect(result).toEqual({
      a: 'AAA',
      b: 'BBB'
    })
  })

  it('handles parallel promises with an array', async () => {
    const result = await flow.parallel([
      () => Promise.resolve('AAA'),
      () => Promise.resolve('BBB')
    ])

    expect(result).toEqual([
      'AAA',
      'BBB'
    ])
  })
})
