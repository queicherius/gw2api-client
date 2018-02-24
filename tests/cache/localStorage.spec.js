/* eslint-env node, mocha */
import { expect } from 'chai'
import storage from '../../src/cache/localStorage'
import localStorage from 'localstorage-memory'
const cache = storage({localStorage: localStorage, gcTick: 500, persistDebounce: 100})
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('cache > localStorage', function () {
  this.timeout(5000)

  beforeEach(() => {
    cache.flush()
  })

  it('requires an configuration object', () => {
    expect(() => storage()).to.throw()
  })

  it('can hydrate the cache', async () => {
    localStorage.setItem('gw2api-temp-cache', JSON.stringify({
      foo: {
        value: {bar: 1337},
        expiry: new Date().getTime() + 5 * 60 * 1000
      }
    }))

    const tmpCache = storage({
      prefix: 'gw2api-temp-',
      localStorage: localStorage,
      gcTick: 50000,
      persistDebounce: 100
    })

    // Make sure the data is cached
    let cachedFromPersistent = await tmpCache.get('foo')
    expect(cachedFromPersistent, 'cachedFromPersistent').to.deep.equal({bar: 1337})
  })

  it('can set and get a single value', async () => {
    await cache.set('foo', {herp: 'derp'}, 2)

    // Make sure the data is cached
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh, 'cachedFresh').to.deep.equal({herp: 'derp'})

    // Make sure that the debounce saving is respected
    let storageBeforeSave = localStorage.getItem('gw2api-cache')
    expect(storageBeforeSave, 'storageBeforeSave').to.equal(null)
    await wait(150)
    let storageAfterSave = JSON.parse(localStorage.getItem('gw2api-cache'))
    expect(storageAfterSave.foo.value, 'storageAfterSave value').to.deep.equal({herp: 'derp'})
    expect(storageAfterSave.foo.expiry, 'storageAfterSave expiry').to.be.a('number')

    // Make sure the data expires
    await wait(3000)
    let cachedExpired = await cache.get('foo')
    expect(cachedExpired, 'cachedExpired').to.deep.equal(null)
  })

  it('can set and get multiple values', async () => {
    await cache.set('abc', {foo: 'bar'}, 2)
    await cache.mset([['foo', 'bar', 2], ['herp', {derp: 1}, 2]])

    let cachedFresh = await cache.get('abc')
    expect(cachedFresh, 'cachedFresh').to.deep.equal({foo: 'bar'})
    let cachedFreshMany = await cache.mget(['foo', 'herp', 'abc'])
    expect(cachedFreshMany, 'cachedFreshMany').to.deep.equal(['bar', {derp: 1}, {foo: 'bar'}])

    await wait(3000)

    let cachedExpired = await cache.mget(['foo', 'herp', 'abc'])
    expect(cachedExpired, 'cachedExpired').to.deep.equal([null, null, null])
  })

  it('can flush the cache', async () => {
    await cache.set('foo', 'bar', 60 * 60)
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh, 'cachedFresh').to.equal('bar')

    await cache.flush()

    let cachedFlushed = await cache.get('foo')
    expect(cachedFlushed, 'cachedFlushed').to.equal(null)
  })

  it('triggers garbage collection', async () => {
    localStorage.setItem('lol', 'xd')
    await cache.set('foo', 'bar', 1)
    await cache.set('herp', 'derp', 5)
    await wait(3000)

    // Memory keys
    let memoryKeys = Object.keys(cache._getStorage())
    expect(memoryKeys).to.deep.equal(['herp'])

    // Make sure we don't delete other keys of importance
    let keys = []
    for (let i = 0; i !== localStorage.length; i++) {
      keys.push(localStorage.key(i))
    }

    expect(keys).to.deep.equal(['gw2api-temp-cache', 'lol', 'gw2api-cache'])

    // Make sure that the non-expired item is persisted
    let persistentStorage = JSON.parse(localStorage.getItem('gw2api-cache'))
    expect(Object.keys(persistentStorage), 'persistentStorage keys').to.deep.equal(['herp'])
    expect(persistentStorage.herp.value, 'persistentStorage value').to.equal('derp')
    expect(persistentStorage.herp.expiry, 'persistentStorage expiry').to.be.a('number')
  })
})
