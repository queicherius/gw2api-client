/* eslint-env jest */
const storage = require('../../src/cache/browser')
const idbMock = require('../mocks/idb.mock.js')

const cache = storage({ storageEngine: idbMock, gcTick: 500, persistDebounce: 100 })
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('cache > browser', function () {
  jest.setTimeout(5000)

  beforeEach(() => {
    cache.flush()
  })

  it('can hydrate the cache', async () => {
    await idbMock.set('gw2api-temp-cache', {
      foo: {
        value: { bar: 1337 },
        expiry: new Date().getTime() + 5 * 60 * 1000
      }
    })

    const tmpCache = storage({
      storageKey: 'gw2api-temp-cache',
      storageEngine: idbMock,
      gcTick: 50000,
      persistDebounce: 100
    })

    // Make sure the data is cached
    await wait(100)
    let cachedFromPersistent = await tmpCache.get('foo')
    expect(cachedFromPersistent).toEqual({ bar: 1337 })
  })

  it('can set and get a single value', async () => {
    await cache.set('foo', { herp: 'derp' }, 2)

    // Make sure the data is cached
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh).toEqual({ herp: 'derp' })

    // Make sure that the debounce saving is respected
    let storageBeforeSave = await idbMock.get('gw2api-cache')
    expect(storageBeforeSave).toEqual(undefined)
    await wait(150)
    let storageAfterSave = await idbMock.get('gw2api-cache')
    expect(storageAfterSave.foo.value).toEqual({ herp: 'derp' })
    expect(typeof storageAfterSave.foo.expiry).toEqual('number')

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

  it('can flush the cache', async () => {
    await cache.set('foo', 'bar', 60 * 60)
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh).toEqual('bar')

    await cache.flush()

    let cachedFlushed = await cache.get('foo')
    expect(cachedFlushed).toEqual(null)
  })

  it('triggers garbage collection', async () => {
    await idbMock.set('lol', 'xd')
    await cache.set('foo', 'bar', 1)
    await cache.set('herp', 'derp', 5)
    await wait(3000)

    // Memory keys
    let memoryKeys = Object.keys(cache._getStorage())
    expect(memoryKeys).toEqual(['herp'])

    // Make sure we don't delete other keys of importance
    let keys = await idbMock.keys()
    expect(keys).toEqual(['gw2api-temp-cache', 'lol', 'gw2api-cache'])

    // Make sure that the non-expired item is persisted
    let persistentStorage = await idbMock.get('gw2api-cache')
    expect(Object.keys(persistentStorage)).toEqual(['herp'])
    expect(persistentStorage.herp.value).toEqual('derp')
    expect(typeof persistentStorage.herp.expiry).toEqual('number')
  })
})
