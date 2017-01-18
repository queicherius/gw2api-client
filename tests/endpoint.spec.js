/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from './mocks/client.mock'
import Module from '../src/endpoint'
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function expectError (callback) {
  let err
  try {
    await callback()
  } catch (e) {
    err = e
  }
  expect(err).to.exist
  expect(err).to.be.an.instanceof(Error)
}

describe('abstract endpoint', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
    endpoint.caches.map(cache => cache.flush())
  })

  describe('ids', () => {
    it('support', async () => {
      let content = [1, 2]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      fetchMock.addResponse(content)

      let entry = await endpoint.ids()
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test')
      expect(entry).to.deep.equal(content)
    })

    it('caching', async () => {
      let content = [1, 2]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)

      let entry = await endpoint.ids()
      await wait(50)
      let entryShouldCache = await endpoint.ids()
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:ids')

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
    })

    it('cant mutate cache data', async () => {
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse([1, 2])

      let entry = await endpoint.ids()
      entry[0] = 42
      await wait(50)
      let entryShouldCache = await endpoint.ids()
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:ids')

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal([42, 2])
      expect(entryShouldCache).to.deep.equal([1, 2])
      expect(entryInCache).to.deep.equal([1, 2])
    })

    it('live', async () => {
      let content = [1, 2]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)
      fetchMock.addResponse(content)

      let entry = await endpoint.live().ids()
      let entryShouldBeLive = await endpoint.live().ids()
      await wait(50)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:ids')

      expect(fetchMock.urls()).to.deep.equal([
        'https://api.guildwars2.com/v2/test',
        'https://api.guildwars2.com/v2/test'
      ])
      expect(entry).to.deep.equal(content)
      expect(entryShouldBeLive).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
    })

    it('only for bulk expanding', async () => {
      await expectError(() => endpoint.ids())
    })
  })

  describe('get', () => {
    it('support for bulk expanding', async () => {
      let content = {id: 1, name: 'foo'}
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      fetchMock.addResponse(content)

      let entry = await endpoint.get(1)
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?id=1')
      expect(entry).to.deep.equal(content)
    })

    it('support for non bulk expanding', async () => {
      let content = {id: 1, name: 'foo'}
      endpoint.url = '/v2/test'
      fetchMock.addResponse(content)

      let entry = await endpoint.get()
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test')
      expect(entry).to.deep.equal(content)
    })

    it('support for non bulk expanding with custom url', async () => {
      let content = {id: 1, name: 'foo'}
      endpoint.url = '/v2/test'
      fetchMock.addResponse(content)

      let entry = await endpoint.get('/bar?output_id=123&input_id=456', true)
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test/bar?output_id=123&input_id=456')
      expect(entry).to.deep.equal(content)
    })

    it('caching for bulk expanding', async () => {
      let content = {id: 1, name: 'foo'}
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)

      let entry = await endpoint.get(1)
      await wait(50)
      let entryShouldCache = await endpoint.get(1)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:1')

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?id=1')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
    })

    it('caching for non bulk expanding', async () => {
      let content = {id: 1, name: 'foo'}
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)

      let entry = await endpoint.get()
      await wait(50)
      let entryShouldCache = await endpoint.get()
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test')
      let bulkEntryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:1')

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
      expect(bulkEntryInCache).to.deep.equal(null)
    })

    it('caching for non bulk expanding with custom url', async () => {
      let content = {id: 1, name: 'foo'}
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)

      let entry = await endpoint.get('/bar?output_id=123&input_id=456', true)
      await wait(50)
      let entryShouldCache = await endpoint.get('/bar?output_id=123&input_id=456', true)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:/bar?output_id=123&input_id=456')

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test/bar?output_id=123&input_id=456')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
    })

    it('cant mutate cache data', async () => {
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse({id: 1, name: 'foo'})

      let entry = await endpoint.get(1)
      entry.name = 'NOT FOO'
      await wait(50)
      let entryShouldCache = await endpoint.get(1)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:1')

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?id=1')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal({id: 1, name: 'NOT FOO'})
      expect(entryShouldCache).to.deep.equal({id: 1, name: 'foo'})
      expect(entryInCache).to.deep.equal({id: 1, name: 'foo'})
    })

    it('live', async () => {
      let content = {id: 1, name: 'foo'}
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)
      fetchMock.addResponse(content)

      let entry = await endpoint.live().get(1)
      let entryShouldBeLive = await endpoint.live().get(1)
      await wait(50)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:1')

      expect(fetchMock.urls()).to.deep.equal([
        'https://api.guildwars2.com/v2/test?id=1',
        'https://api.guildwars2.com/v2/test?id=1'
      ])
      expect(entry).to.deep.equal(content)
      expect(entryShouldBeLive).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
    })

    it('requires an id for bulk expanding', async () => {
      endpoint.isBulk = true
      await expectError(() => endpoint.get())
    })
  })

  describe('many', () => {
    it('support', async () => {
      let content = [{id: 2, name: 'bar'}, {id: 1, name: 'foo'}]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      fetchMock.addResponse(content)

      let ids = [2, 1, 1, 2, 2, 1, 1]
      let entry = await endpoint.many(ids)
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?ids=2,1')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(ids, 'ids are not getting mutated').to.deep.equal([2, 1, 1, 2, 2, 1, 1])
    })

    it('uses the minimal amount of requests', async () => {
      endpoint.isBulk = true
      endpoint.maxPageSize = 3
      endpoint.url = '/v2/test'
      fetchMock.addResponse([1, 2, 3])
      fetchMock.addResponse([4, 5])

      let entry = await endpoint.many([1, 2, 3, 4, 5])
      expect(fetchMock.urls()).to.deep.equal([
        'https://api.guildwars2.com/v2/test?ids=1,2,3',
        'https://api.guildwars2.com/v2/test?ids=4,5'
      ])
      expect(entry).to.deep.equal([1, 2, 3, 4, 5])
    })

    it('doesn\'t execute a request for 0 ids', async () => {
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      fetchMock.addResponse('nope.')

      let entry = await endpoint.many([])
      expect(fetchMock.urls().length).to.equal(0)
      expect(entry).to.deep.equal([])
    })

    it('caching', async () => {
      let content = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)

      let entry = await endpoint.many([1, 2, 3])
      await wait(50)
      let entryShouldCache = await endpoint.many([2, 3, 2])
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?ids=1,2,3')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content.slice(1))
      expect(bulkEntriesInCache).to.deep.equal(content)
    })

    it('partial caching', async () => {
      let content = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'},
        {id: 4, name: 'xd'}
      ]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content.slice(1, 3))
      fetchMock.addResponse(content.slice(0, 1).concat(content.slice(3, 4)))

      let entry = await endpoint.many([2, 3])
      await wait(50)
      let entryShouldCache = await endpoint.many([1, 2, 3, 4])
      await wait(50)
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3',
        'https://api.guildwars2.com/v2/test:4'
      ])

      expect(fetchMock.urls()).to.deep.equal([
        'https://api.guildwars2.com/v2/test?ids=2,3',
        'https://api.guildwars2.com/v2/test?ids=1,4'
      ])
      expect(entry).to.deep.equal(content.slice(1, 3))
      expect(entryShouldCache, 'merged entries in the same order').to.deep.equal(content)
      expect(bulkEntriesInCache).to.deep.equal(content)
    })

    it('cant mutate cache data', async () => {
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse([
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ])

      let entry = await endpoint.many([1, 2, 3])
      entry[1].name = 'NOT BAR'
      await wait(50)
      let entryShouldCache = await endpoint.many([2, 3, 2])
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?ids=1,2,3')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal([
        {id: 1, name: 'foo'},
        {id: 2, name: 'NOT BAR'},
        {id: 3, name: 'fooo'}
      ])
      expect(entryShouldCache).to.deep.equal([
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ])
      expect(bulkEntriesInCache).to.deep.equal([
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ])
    })

    it('match the api behaviour for cached data if all not-cached data is invalid', async () => {
      let content = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)
      fetchMock.addResponseError({status: 404}, {text: 'all provided ids are invalid'})

      let entry = await endpoint.many([1, 2, 3])
      await wait(50)
      let entryShouldCache = await endpoint.many([2, 3, 2, 4])
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?ids=4')
      expect(fetchMock.urls().length).to.equal(2)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content.slice(1))
      expect(bulkEntriesInCache).to.deep.equal(content)
    })

    it('live', async () => {
      let content = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)
      fetchMock.addResponse(content)

      let entry = await endpoint.live().many([1, 2, 3])
      let entryShouldBeLive = await endpoint.live().many([1, 2, 3])
      await wait(50)
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.urls()).to.deep.equal([
        'https://api.guildwars2.com/v2/test?ids=1,2,3',
        'https://api.guildwars2.com/v2/test?ids=1,2,3'
      ])
      expect(entry).to.deep.equal(content)
      expect(entryShouldBeLive).to.deep.equal(content)
      expect(bulkEntriesInCache).to.deep.equal(content)
    })

    it('only available for bulk expanding', async () => {
      await expectError(() => endpoint.many([1, 2]))
    })
  })

  describe('page', () => {
    it('support', async () => {
      let content = [1, 2, 3]
      endpoint.isPaginated = true
      endpoint.url = '/v2/test'
      fetchMock.addResponse(content)

      let entry = await endpoint.page(0, 3)
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=3')
      expect(entry).to.deep.equal(content)
    })

    it('caching for non bulk endpoints', async () => {
      let content = [1, 2, 3]
      endpoint.isPaginated = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)

      let entry = await endpoint.page(0, 3)
      await wait(50)
      let entryShouldCache = await endpoint.page(0, 3)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:page-0/3')
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=3')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
      expect(bulkEntriesInCache.filter(x => x).length).to.deep.equal(0)
    })

    it('caching for bulk endpoints', async () => {
      let content = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ]
      endpoint.isPaginated = true
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)

      let entry = await endpoint.page(0, 3)
      await wait(50)
      let entryShouldCache = await endpoint.page(0, 3)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:page-0/3')
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=3')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
      expect(bulkEntriesInCache).to.deep.equal(content)
    })

    it('cant mutate cache data', async () => {
      endpoint.isPaginated = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse([1, 2, 3])

      let entry = await endpoint.page(0, 3)
      entry[0] = 42
      await wait(50)
      let entryShouldCache = await endpoint.page(0, 3)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:page-0/3')
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=3')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal([42, 2, 3])
      expect(entryShouldCache).to.deep.equal([1, 2, 3])
      expect(entryInCache).to.deep.equal([1, 2, 3])
      expect(bulkEntriesInCache.filter(x => x).length).to.deep.equal(0)
    })

    it('live', async () => {
      let content = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ]
      endpoint.isPaginated = true
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)
      fetchMock.addResponse(content)

      let entry = await endpoint.live().page(0, 3)
      let entryShouldBeLive = await endpoint.live().page(0, 3)
      await wait(50)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:page-0/3')
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.urls()).to.deep.equal([
        'https://api.guildwars2.com/v2/test?page=0&page_size=3',
        'https://api.guildwars2.com/v2/test?page=0&page_size=3'
      ])
      expect(entry).to.deep.equal(content)
      expect(entryShouldBeLive).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
      expect(bulkEntriesInCache).to.deep.equal(content)
    })

    it('throws an error for out of range size', async () => {
      endpoint.isBulk = true
      await expectError(() => endpoint.page(0, 1000))
    })

    it('throws an error for out of range pages', async () => {
      endpoint.isBulk = true
      await expectError(() => endpoint.page(-10))
    })

    it('only for bulk expanding and paginated', async () => {
      await expectError(() => endpoint.page(0))
    })
  })

  describe('all', () => {
    it('support for paginated', async () => {
      endpoint.isPaginated = true
      endpoint.maxPageSize = 3
      endpoint.url = '/v2/test'
      fetchMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 8
        }
      })
      fetchMock.addResponse([4, 5, 6])
      fetchMock.addResponse([7, 8])

      let entry = await endpoint.all()
      expect(fetchMock.urls().length).to.equal(3)
      expect(fetchMock.urls()[1]).to.equal('https://api.guildwars2.com/v2/test?page=1&page_size=3')
      expect(entry).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8])
    })

    it('use the minimal amount of requests', async () => {
      endpoint.isPaginated = true
      endpoint.maxPageSize = 3
      endpoint.url = '/v2/test'
      fetchMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 3
        }
      })

      let entry = await endpoint.all()
      expect(fetchMock.urls().length).to.equal(1)
      expect(fetchMock.urls()[0]).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=3')
      expect(entry).to.deep.equal([1, 2, 3])
    })

    it('support for bulk expanding without bulk all', async () => {
      endpoint.isBulk = true
      endpoint.supportsBulkAll = false
      endpoint.maxPageSize = 3
      endpoint.url = '/v2/test'
      fetchMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 8
        }
      })
      fetchMock.addResponse([4, 5, 6])
      fetchMock.addResponse([7, 8])

      let entry = await endpoint.all()
      expect(fetchMock.urls().length).to.equal(3)
      expect(fetchMock.urls()[1]).to.equal('https://api.guildwars2.com/v2/test?page=1&page_size=3')
      expect(entry).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8])
    })

    it('support for bulk expanding with bulk all', async () => {
      let content = [1, 2, 3]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      fetchMock.addResponse(content)

      let entry = await endpoint.all()
      expect(fetchMock.urls().length).to.equal(1)
      expect(fetchMock.urls()[0]).to.equal('https://api.guildwars2.com/v2/test?ids=all')
      expect(entry).to.deep.equal(content)
    })

    it('caching for non bulk endpoints', async () => {
      let content = [1, 2, 3]
      endpoint.isPaginated = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse({
        json: () => content,
        headers: {
          get: () => 3
        }
      })

      let entry = await endpoint.all()
      await wait(50)
      let entryShouldCache = await endpoint.all()
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:all')
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=200')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
      expect(bulkEntriesInCache.filter(x => x).length).to.deep.equal(0)
    })

    it('caching for bulk endpoints', async () => {
      let content = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)

      let entry = await endpoint.all()
      await wait(50)
      let entryShouldCache = await endpoint.all()
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:all')
      let cacheEntries = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?ids=all')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
      expect(entryShouldCache).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
      expect(cacheEntries).to.deep.equal(content)
    })

    it('cant mutate cache data', async () => {
      endpoint.isPaginated = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 3
        }
      })

      let entry = await endpoint.all()
      entry[0] = 42
      await wait(50)
      let entryShouldCache = await endpoint.all()
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:all')
      let bulkEntriesInCache = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=200')
      expect(fetchMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal([42, 2, 3])
      expect(entryShouldCache).to.deep.equal([1, 2, 3])
      expect(entryInCache).to.deep.equal([1, 2, 3])
      expect(bulkEntriesInCache.filter(x => x).length).to.deep.equal(0)
    })

    it('live', async () => {
      let content = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'fooo'}
      ]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(content)
      fetchMock.addResponse(content)

      let entry = await endpoint.live().all()
      let entryShouldBeLive = await endpoint.live().all()
      await wait(50)
      let entryInCache = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:all')
      let cacheEntries = await endpoint._cacheGetMany([
        'https://api.guildwars2.com/v2/test:1',
        'https://api.guildwars2.com/v2/test:2',
        'https://api.guildwars2.com/v2/test:3'
      ])

      expect(fetchMock.urls()).to.deep.equal([
        'https://api.guildwars2.com/v2/test?ids=all',
        'https://api.guildwars2.com/v2/test?ids=all'
      ])
      expect(entry).to.deep.equal(content)
      expect(entryShouldBeLive).to.deep.equal(content)
      expect(entryInCache).to.deep.equal(content)
      expect(cacheEntries).to.deep.equal(content)
    })

    it('only for bulk expanding and paginated', async () => {
      await expectError(() => endpoint.all())
    })
  })

  describe('caching', () => {
    beforeEach(() => {
      endpoint.cacheTime = 60 * 60
    })

    it('includes the language into the caching key', async () => {
      let contentEn = {id: 1, name: 'Good Day'}
      let contentDe = {id: 1, name: 'Guten Tag'}
      endpoint.isLocalized = true
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(contentEn)
      fetchMock.addResponse(contentDe)

      let entryEn = await endpoint.get(1)
      await wait(50)
      let entryShouldCacheEn = await endpoint.get(1)
      let entryInCacheEn = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:1:en')

      let entryDe = await endpoint.language('de').get(1)
      await wait(50)
      let entryShouldCacheDe = await endpoint.language('de').get(1)
      let entryInCacheDe = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:1:de')

      expect(fetchMock.urls().length).to.equal(2)
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?id=1&lang=de')
      expect(entryEn, 'entry en').to.deep.equal(contentEn)
      expect(entryShouldCacheEn, 'from cache en').to.deep.equal(contentEn)
      expect(entryInCacheEn, 'in cache en').to.deep.equal(contentEn)
      expect(entryDe, 'entry de').to.deep.equal(contentDe)
      expect(entryShouldCacheDe, 'from cache de').to.deep.equal(contentDe)
      expect(entryInCacheDe, 'in cache de').to.deep.equal(contentDe)
    })

    it('includes the autentication token into the caching key', async () => {
      let contentUserOne = {name: 'foo.1234'}
      let contentUserTwo = {name: 'bar.1234'}
      endpoint.isAuthenticated = true
      endpoint.url = '/v2/test'
      endpoint.cacheTime = 60
      fetchMock.addResponse(contentUserOne)
      fetchMock.addResponse(contentUserTwo)

      let entryUserOne = await endpoint.authenticate('key-user-one').get()
      await wait(50)
      let entryShouldCacheUserOne = await endpoint.authenticate('key-user-one').get()
      let entryInCacheUserOne = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:69375f55664051a0f867d4c71f0ef53beeeda51d')

      let entryUserTwo = await endpoint.authenticate('key-user-two').get()
      await wait(50)
      let entryShouldCacheUserTwo = await endpoint.authenticate('key-user-two').get()
      let entryInCacheUserTwo = await endpoint._cacheGetSingle('https://api.guildwars2.com/v2/test:da9125851cff5faf9e610a95294f615aeee34816')

      expect(fetchMock.urls().length).to.equal(2)
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?access_token=key-user-two')
      expect(entryUserOne, 'entry user one').to.deep.equal(contentUserOne)
      expect(entryShouldCacheUserOne, 'from cache user one').to.deep.equal(contentUserOne)
      expect(entryInCacheUserOne, 'in cache user one').to.deep.equal(contentUserOne)
      expect(entryUserTwo, 'entry user two').to.deep.equal(contentUserTwo)
      expect(entryShouldCacheUserTwo, 'from cache user two').to.deep.equal(contentUserTwo)
      expect(entryInCacheUserTwo, 'in cache user two').to.deep.equal(contentUserTwo)
    })

    it('single sets in all connected cache storages', async () => {
      endpoint._cacheSetSingle('foo', {bar: 1337})
      await wait(50)

      expect(await endpoint.caches[1].get('foo')).to.deep.equal({bar: 1337})
      expect(await endpoint.caches[2].get('foo')).to.deep.equal({bar: 1337})
    })

    it('many sets in all connected cache storages', async () => {
      endpoint._cacheSetMany([['foo', {bar: 1337}], ['herp', {derp: 42}]])
      await wait(50)

      expect(await endpoint.caches[1].mget(['foo', 'herp'])).to.deep.equal([{bar: 1337}, {derp: 42}])
      expect(await endpoint.caches[2].mget(['foo', 'herp'])).to.deep.equal([{bar: 1337}, {derp: 42}])
    })

    it('single gets of the first possible connected cache storage', async () => {
      await endpoint.caches[1].set('herp', 'derp', 60)
      await endpoint.caches[2].set('herp', 'NOPE')
      await endpoint.caches[2].set('asd', {fgh: 42}, 60)
      await wait(50)

      expect(await endpoint._cacheGetSingle('foo')).to.deep.equal(null)
      expect(await endpoint._cacheGetSingle('herp')).to.deep.equal('derp')
      expect(await endpoint._cacheGetSingle('asd')).to.deep.equal({fgh: 42})
    })

    it('many gets of the first possible connected cache storage', async () => {
      await endpoint.caches[1].set('foo', 'bar', 60)
      await endpoint.caches[1].set('herp', 'derp', 60)
      await endpoint.caches[2].set('herp', 'NOPE')
      await endpoint.caches[2].set('asd', {fgh: 42}, 60)
      await wait(50)

      expect(await endpoint._cacheGetMany(['x', 'foo', 'herp', 'y', 'asd', 'z']))
        .to.deep.equal([null, 'bar', 'derp', null, {fgh: 42}, null])
    })
  })

  describe('requests', () => {
    it('gives the type to the underlying api for single requests', async () => {
      endpoint.isLocalized = true
      fetchMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 8
        }
      })

      let entry = await endpoint._request('/v2/test', 'response')
      expect(entry.json()).to.deep.equal([1, 2, 3])
      expect(entry.headers.get()).to.equal(8)
    })

    it('gives the query parameters to the underlying api for single requests', async () => {
      endpoint.isLocalized = true
      endpoint.language('en')
      fetchMock.addResponse({foo: 'bar'})

      let entry = await endpoint._request('/v2/test')
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?lang=en')
      expect(entry).to.deep.equal({foo: 'bar'})
    })

    it('gives the type to the underlying api for multiple requests', async () => {
      endpoint.isLocalized = true
      fetchMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 8
        }
      })

      let entries = await endpoint._requestMany(['/v2/test'], 'response')
      expect(entries[0].json()).to.deep.equal([1, 2, 3])
      expect(entries[0].headers.get()).to.equal(8)
    })

    it('gives the query parameters to the underlying api for multiple requests', async () => {
      endpoint.isLocalized = true
      endpoint.language('en')
      fetchMock.addResponse({foo: 'bar'})

      let entry = await endpoint._requestMany(['/v2/test'])
      expect(fetchMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?lang=en')
      expect(entry).to.deep.equal([{foo: 'bar'}])
    })
  })

  describe('_buildUrl', () => {
    it('sets the language header for localized endpoints', () => {
      endpoint.isLocalized = true
      endpoint.language('de')
      let url = endpoint._buildUrl('/test')
      expect(url).to.equal('https://api.guildwars2.com/test?lang=de')
    })

    it('doesn\'t set the language header for non localized endpoints', () => {
      endpoint.language('de')
      let url = endpoint._buildUrl('/test')
      expect(url).to.equal('https://api.guildwars2.com/test')
    })

    it('sets the authorization header for authenticated endpoints', () => {
      endpoint.isAuthenticated = true
      endpoint.authenticate('key')
      let url = endpoint._buildUrl('/test')
      expect(url).to.equal('https://api.guildwars2.com/test?access_token=key')
    })

    it('doesn\'t set the authorization header for non authenticated endpoints', () => {
      endpoint.authenticate('key')
      let url = endpoint._buildUrl('/test')
      expect(url).to.equal('https://api.guildwars2.com/test')
    })

    it('sets the authorization header for optional authenticated endpoints', () => {
      endpoint.isAuthenticated = true
      endpoint.isOptionallyAuthenticated = true
      endpoint.authenticate('key')
      let url = endpoint._buildUrl('/test')
      expect(url).to.equal('https://api.guildwars2.com/test?access_token=key')
    })

    it('doesn\'t set the authorization header for optional authenticated endpoints if the key is not set', () => {
      endpoint.isAuthenticated = true
      endpoint.isOptionallyAuthenticated = true
      let url = endpoint._buildUrl('/test')
      expect(url).to.equal('https://api.guildwars2.com/test')
    })

    it('handles an already existing query', () => {
      endpoint.isAuthenticated = true
      endpoint.authenticate('key')
      endpoint.isLocalized = true
      endpoint.language('de')
      let url = endpoint._buildUrl('/test?page=0')
      expect(url).to.equal('https://api.guildwars2.com/test?page=0&access_token=key&lang=de')
    })
  })

  it('sets the language', () => {
    let x = endpoint.language('de')
    expect(x.lang).to.equal('de')
    expect(x).to.be.an.instanceof(Module)
  })

  it('sets the api key', () => {
    let x = endpoint.authenticate('key')
    expect(x.apiKey).to.equal('key')
    expect(x).to.be.an.instanceof(Module)
  })
})
