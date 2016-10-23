/* eslint-env node, mocha */
import {expect} from 'chai'
import storage from '../../src/cache/localStorage'
import localStorage from 'localstorage-memory'
const cache = storage({localStorage: localStorage, gcTick: 500})
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('cache > localStorage', function () {
  this.timeout(5000)

  beforeEach(() => {
    cache.flush()
  })

  it('requires an configuration object', () => {
    expect(() => storage()).to.throw()
  })

  it('can flush the cache', async () => {
    await cache.set('foo', 'bar', 60 * 60)
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh, 'cachedFresh').to.equal('bar')

    await cache.flush()

    let cachedFlushed = await cache.get('foo')
    expect(cachedFlushed, 'cachedFlushed').to.equal(null)
  })

  it('can set and get a single value', async () => {
    await cache.set('foo', 'bar', 2)
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh, 'cachedFresh').to.equal('bar')

    await wait(3000)

    let cachedExpired = await cache.get('foo')
    expect(cachedExpired, 'cachedExpired').to.equal(null)
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

  it('triggers garbage collection', async () => {
    await cache.set('foo', 'bar', 1)
    await cache.set('herp', 'derp', 5)
    localStorage.setItem('lol', 'xd')
    await wait(3000)

    let keys = []
    for (let i = 0; i !== localStorage.length; i++) {
      keys.push(localStorage.key(i))
    }

    expect(keys).to.deep.equal(['gw2api-herp', 'lol'])
  })
})
