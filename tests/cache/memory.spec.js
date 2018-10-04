/* eslint-env jest */
const storage = require('../../src/cache/memory')
const cache = storage({ gcTick: 500 })
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('cache > memory', function () {
  jest.setTimeout(5000)

  beforeEach(() => {
    cache.flush()
  })

  it('can flush the cache', async () => {
    await cache.set('foo', 'bar', 60 * 60)
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh).toEqual('bar')

    await cache.flush()

    let cachedFlushed = await cache.get('foo')
    expect(cachedFlushed).toEqual(null)
  })

  it('can set and get a single value', async () => {
    await cache.set('foo', { herp: 'derp' }, 2)

    // Make sure the data is cached
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh).toEqual({ herp: 'derp' })

    // Make sure the data expires
    await wait(3000)
    let cachedExpired = await cache.get('foo')
    expect(cachedExpired).toEqual(null)
  })

  it('can set and get multiple values', async () => {
    await cache.set('abc', { foo: 'bar' }, 2)
    await cache.mset([['foo', 'bar', 2], ['herp', { derp: 1 }, 2]])

    let cachedFresh = await cache.get('abc')
    expect(cachedFresh).toEqual({ foo: 'bar' })
    let cachedFreshMany = await cache.mget(['foo', 'herp', 'abc'])
    expect(cachedFreshMany).toEqual(['bar', { derp: 1 }, { foo: 'bar' }])

    await wait(3000)

    let cachedExpired = await cache.mget(['foo', 'herp', 'abc'])
    expect(cachedExpired).toEqual([null, null, null])
  })

  it('triggers garbage collection', async () => {
    await cache.set('foo', 'bar', 1)
    await cache.set('herp', 'derp', 10)

    await wait(3000)

    let keys = Object.keys(cache._getStorage())
    expect(keys).toEqual(['herp'])
  })
})
