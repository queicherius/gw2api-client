/* eslint-env node, mocha */
const expect = require('chai').expect
const reqMock = require('gw2e-requester/mock')
const Module = require('../src/endpoint.js')

const mockClient = {
  lang: false,
  apiKey: false,
  language: function (lang) {
    this.lang = lang
  },
  authenticate: function (key) {
    this.apiKey = key
  }
}

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
  var endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    reqMock.reset()
    endpoint.requester = reqMock
  })

  describe('ids', () => {
    it('support', async () => {
      let content = [1, 2]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      reqMock.addResponse(content)

      let ids = await endpoint.ids()
      expect(reqMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test')
      expect(ids).to.deep.equal(content)
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
      reqMock.addResponse(content)

      let entry = await endpoint.get(1)
      expect(reqMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?id=1')
      expect(entry).to.deep.equal(content)
    })

    it('support for non bulk expanding', async () => {
      let content = {id: 1, name: 'foo'}
      endpoint.url = '/v2/test'
      reqMock.addResponse(content)

      let entry = await endpoint.get()
      expect(reqMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test')
      expect(entry).to.deep.equal(content)
    })
  })

  describe('many', () => {
    it('support', async () => {
      let content = [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}]
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      reqMock.addResponse(content)

      let entry = await endpoint.many([1, 2])
      expect(reqMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?ids=1,2')
      expect(reqMock.urls().length).to.equal(1)
      expect(entry).to.deep.equal(content)
    })

    it('uses the minimal amount of requests', async () => {
      endpoint.isBulk = true
      endpoint.maxPageSize = 3
      endpoint.url = '/v2/test'
      reqMock.addResponse([1, 2, 3])
      reqMock.addResponse([4, 5])

      let entry = await endpoint.many([1, 2, 3, 4, 5])
      expect(reqMock.urls()).to.deep.equal([
        'https://api.guildwars2.com/v2/test?ids=1,2,3',
        'https://api.guildwars2.com/v2/test?ids=4,5'
      ])
      expect(entry).to.deep.equal([1, 2, 3, 4, 5])
    })

    it('doesn\'t execute a request for 0 ids', async () => {
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      reqMock.addResponse('nope.')

      let entry = await endpoint.many([])
      expect(reqMock.urls().length).to.equal(0)
      expect(entry).to.deep.equal([])
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
      reqMock.addResponse(content)

      let entry = await endpoint.page(0, 3)
      expect(reqMock.lastUrl()).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=3')
      expect(entry).to.deep.equal(content)
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
      reqMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 8
        }
      })
      reqMock.addResponse([4, 5, 6])
      reqMock.addResponse([7, 8])

      let entry = await endpoint.all()
      expect(reqMock.urls().length).to.equal(3)
      expect(reqMock.urls()[1]).to.equal('https://api.guildwars2.com/v2/test?page=1&page_size=3')
      expect(entry).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8])
    })

    it('use the minimal amount of requests', async () => {
      endpoint.isPaginated = true
      endpoint.maxPageSize = 3
      endpoint.url = '/v2/test'
      reqMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 3
        }
      })

      let entry = await endpoint.all()
      expect(reqMock.urls().length).to.equal(1)
      expect(reqMock.urls()[0]).to.equal('https://api.guildwars2.com/v2/test?page=0&page_size=3')
      expect(entry).to.deep.equal([1, 2, 3])
    })

    it('support for bulk expanding without bulk all', async () => {
      endpoint.isBulk = true
      endpoint.supportsBulkAll = false
      endpoint.maxPageSize = 3
      endpoint.url = '/v2/test'
      reqMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 8
        }
      })
      reqMock.addResponse([4, 5, 6])
      reqMock.addResponse([7, 8])

      let entry = await endpoint.all()
      expect(reqMock.urls().length).to.equal(3)
      expect(reqMock.urls()[1]).to.equal('https://api.guildwars2.com/v2/test?page=1&page_size=3')
      expect(entry).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8])
    })

    it('support for bulk expanding with bulk all', async () => {
      endpoint.isBulk = true
      endpoint.url = '/v2/test'
      reqMock.addResponse([1, 2, 3])

      let entry = await endpoint.all()
      expect(reqMock.urls().length).to.equal(1)
      expect(reqMock.urls()[0]).to.equal('https://api.guildwars2.com/v2/test?ids=all')
      expect(entry).to.deep.equal([1, 2, 3])
    })

    it('only for bulk expanding and paginated', async () => {
      await expectError(() => endpoint.all())
    })
  })

  describe('headers', () => {
    it('sets the language on the client', () => {
      let x = endpoint.language('de')
      expect(mockClient.lang).to.equal('de')
      expect(x).to.be.an.instanceof(Module)
    })

    it('sets the language header for localized endpoints', () => {
      endpoint.isLocalized = true
      endpoint.language('de')
      let headers = endpoint.buildHeaders()
      expect(headers['Accept-Language']).to.equal('de')
    })

    it('doesn\'t set the language header for non localized endpoints', () => {
      endpoint.language('de')
      let headers = endpoint.buildHeaders()
      expect(headers['Accept-Language']).to.equal(undefined)
    })

    it('sets the api key on the client', () => {
      let x = endpoint.authenticate('key')
      expect(mockClient.apiKey).to.equal('key')
      expect(x).to.be.an.instanceof(Module)
    })

    it('sets the authorization header for authenticated endpoints', () => {
      endpoint.isAuthenticated = true
      endpoint.authenticate('key')
      let headers = endpoint.buildHeaders()
      expect(headers['Authorization']).to.equal('Bearer key')
    })

    it('doesn\'t set the authorization header for non authenticated endpoints', () => {
      endpoint.authenticate('key')
      let headers = endpoint.buildHeaders()
      expect(headers['Authorization']).to.equal(undefined)
    })
  })

  describe('requests', () => {
    it('gives the type to the underlying api for single requests', async () => {
      endpoint.isLocalized = true
      reqMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 8
        }
      })

      let entry = await endpoint.request('/v2/test', 'response')
      expect(entry.json()).to.deep.equal([1, 2, 3])
      expect(entry.headers.get()).to.equal(8)
    })

    it('gives the headers to the underlying api for single requests', async () => {
      endpoint.isLocalized = true
      endpoint.language('en')
      reqMock.addResponse({foo: 'bar'})

      let entry = await endpoint.request('/v2/test')
      expect(reqMock.lastOption().headers['Accept-Language']).to.equal('en')
      expect(entry).to.deep.equal({foo: 'bar'})
    })

    it('gives the type to the underlying api for multiple requests', async () => {
      endpoint.isLocalized = true
      reqMock.addResponse({
        json: () => [1, 2, 3],
        headers: {
          get: () => 8
        }
      })

      let entries = await endpoint.requestMany(['/v2/test'], 'response')
      expect(entries[0].json()).to.deep.equal([1, 2, 3])
      expect(entries[0].headers.get()).to.equal(8)
    })

    it('gives the headers to the underlying api for multiple requests', async () => {
      endpoint.isLocalized = true
      endpoint.language('en')
      reqMock.addResponse({foo: 'bar'})

      let entry = await endpoint.requestMany(['/v2/test'])
      expect(reqMock.lastOption().headers['Accept-Language']).to.equal('en')
      expect(entry).to.deep.equal([{foo: 'bar'}])
    })
  })
})
