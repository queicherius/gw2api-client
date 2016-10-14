import parseUrl from 'url-parse'
import unique from 'uniq'
import {chunk, flatten, sortByIdList} from './helpers'

export default class AbstractEndpoint {
  constructor (client) {
    this.client = client
    this.fetch = client.fetch
    this.cache = client.cache
    this.baseUrl = 'https://api.guildwars2.com'
    this.isPaginated = false
    this.maxPageSize = 200
    this.isBulk = false
    this.supportsBulkAll = true
    this.isLocalized = false
    this.isAuthenticated = false
    this.isOptionallyAuthenticated = false
    this._skipCache = false
  }

  // Set the language for locale-aware endpoints
  language (lang) {
    this.client.language(lang)
    return this
  }

  // Set the api key for authenticated endpoints
  authenticate (apiKey) {
    this.client.authenticate(apiKey)
    return this
  }

  // Skip caching and get the live data
  live () {
    this._skipCache = true
    return this
  }

  // Get a cache hash for an identifier
  _cacheHash (id) {
    let hash = id ? ':' + id : ''
    return this.baseUrl + this.url + hash
  }

  // Get all ids
  ids () {
    if (!this.isBulk) {
      return Promise.reject(new Error('"ids" is only available for bulk expanding endpoints'))
    }

    // There is no cache time set, so always use the live data
    if (!this.cacheTime) {
      return this._ids()
    }

    // Get as much as possibly out of the cache
    const hash = this._cacheHash('ids')
    const handleCacheContent = (cached) => {
      if (cached) {
        return cached
      }

      return this._ids().then(content => {
        this.cache.set(hash, content, this.cacheTime)
        return content
      })
    }

    return this._skipCache
      ? Promise.resolve(false).then(handleCacheContent)
      : this.cache.get(hash).then(handleCacheContent)
  }

  // Get all ids from the live API
  _ids () {
    return this._request(this.url)
  }

  // Get a single entry by id
  get (id, url = false) {
    if (!id && this.isBulk && !url) {
      return Promise.reject(new Error('"get" requires an id'))
    }

    // There is no cache time set, so always use the live data
    if (!this.cacheTime) {
      return this._get(id, url)
    }

    // Get as much as possibly out of the cache
    const hash = this._cacheHash(id)
    const handleCacheContent = (cached) => {
      if (cached) {
        return cached
      }

      return this._get(id, url).then(content => {
        this.cache.set(hash, content, this.cacheTime)
        return content
      })
    }

    return this._skipCache
      ? Promise.resolve(false).then(handleCacheContent)
      : this.cache.get(hash).then(handleCacheContent)
  }

  // Get a single entry by id from the live API
  _get (id, url) {
    // Request the single id if the endpoint a bulk endpoint
    if (this.isBulk && !url) {
      return this._request(`${this.url}?id=${id}`)
    }

    // We are dealing with a custom url instead
    if (url) {
      return this._request(this.url + id)
    }

    // Just request the base url
    return this._request(this.url)
  }

  // Get multiple entries by ids
  many (ids) {
    if (!this.isBulk) {
      return Promise.reject(new Error('"many" is only available for bulk expanding endpoints'))
    }

    // Exit out early if we don't request any ids
    if (ids.length === 0) {
      return Promise.resolve([])
    }

    // Always only work on unique ids, since that's how the API works
    unique(ids)

    // There is no cache time set, so always use the live data
    if (!this.cacheTime) {
      return this._many(ids)
    }

    // Get as much as possibly out of the cache
    const hashes = ids.map(id => this._cacheHash(id))
    const handleCacheContent = (cached) => {
      cached = cached.filter(x => x)

      if (cached.length === ids.length) {
        return cached
      }

      const missingIds = getMissingIds(ids, cached)
      return this._many(missingIds).then(content => {
        const cacheContent = content.map(value => [this._cacheHash(value.id), value, this.cacheTime])
        this.cache.mset(cacheContent)

        // Merge the new content with the cached content and guarantee element order
        content = content.concat(cached)
        return sortByIdList(content, ids)
      })
    }

    // Find the ids that are missing in the cached data
    const getMissingIds = (ids, cached) => {
      const cachedIds = {}
      cached.map(x => {
        cachedIds[x.id] = 1
      })

      return ids.filter(x => cachedIds[x] !== 1)
    }

    return this._skipCache
      ? Promise.resolve([]).then(handleCacheContent)
      : this.cache.mget(hashes).then(handleCacheContent)
  }

  // Get multiple entries by ids from the live API
  _many (ids) {
    // Chunk the requests to the max page size
    let pages = chunk(ids, this.maxPageSize)
    let requests = pages.map(page => `${this.url}?ids=${page.join(',')}`)

    // Work on all requests in parallel and then flatten the responses into one
    return this._requestMany(requests).then(responses => flatten(responses))
  }

  // Get a single page
  page (page, size = this.maxPageSize) {
    if (!this.isBulk && !this.isPaginated) {
      return Promise.reject(new Error('"page" is only available for bulk expanding or paginated endpoints'))
    }

    if (size > this.maxPageSize || size <= 0) {
      return Promise.reject(new Error(`"size" has to be between 0 and ${this.maxPageSize}, was ${size}`))
    }

    if (page < 0) {
      return Promise.reject(new Error('page has to be 0 or greater'))
    }

    // There is no cache time set, so always use the live data
    if (!this.cacheTime) {
      return this._page(page, size)
    }

    // Get as much as possibly out of the cache
    const hash = this._cacheHash('page-' + page + '/' + size)
    const handleCacheContent = (cached) => {
      if (cached) {
        return cached
      }

      return this._page(page, size).then(content => {
        let cacheContent = [[hash, content, this.cacheTime]]

        if (this.isBulk) {
          cacheContent = cacheContent.concat(content.map(value => [this._cacheHash(value.id), value, this.cacheTime]))
        }

        this.cache.mset(cacheContent)
        return content
      })
    }

    return this._skipCache
      ? Promise.resolve(false).then(handleCacheContent)
      : this.cache.get(hash).then(handleCacheContent)
  }

  // Get a single page from the live API
  _page (page, size) {
    return this._request(`${this.url}?page=${page}&page_size=${size}`)
  }

  // Get all entries
  all () {
    if (!this.isBulk && !this.isPaginated) {
      return Promise.reject(new Error('"all" is only available for bulk expanding or paginated endpoints'))
    }

    // There is no cache time set, so always use the live data
    if (!this.cacheTime) {
      return this._all()
    }

    // Get as much as possibly out of the cache
    const hash = this._cacheHash('all')
    const handleCacheContent = (cached) => {
      if (cached) {
        return cached
      }

      return this._all().then(content => {
        let cacheContent = [[hash, content, this.cacheTime]]

        if (this.isBulk) {
          cacheContent = cacheContent.concat(content.map(value => [this._cacheHash(value.id), value, this.cacheTime]))
        }

        this.cache.mset(cacheContent)
        return content
      })
    }

    return this._skipCache
      ? Promise.resolve(false).then(handleCacheContent)
      : this.cache.get(hash).then(handleCacheContent)
  }

  // Get all entries from the live API
  _all () {
    // Use bulk expansion if the endpoint supports the "all" keyword
    if (this.isBulk && this.supportsBulkAll) {
      return this._request(`${this.url}?ids=all`)
    }

    // Get everything via all pages instead
    let totalEntries
    return this._request(`${this.url}?page=0&page_size=${this.maxPageSize}`, 'response')
      .then(firstPage => {
        // Get the total number of entries off the first page's headers
        totalEntries = firstPage.headers.get('X-Result-Total')
        return firstPage.json()
      })
      .then(result => {
        // Return early if the first page already includes all entries
        if (totalEntries <= this.maxPageSize) {
          return result
        }

        // Request all missing pages in parallel
        let requests = []
        for (let page = 1; page < Math.ceil(totalEntries / this.maxPageSize); page++) {
          requests.push(`${this.url}?page=${page}&page_size=${this.maxPageSize}`)
        }

        return this._requestMany(requests).then(responses => result.concat(flatten(responses)))
      })
  }

  // Execute a single request
  _request (url, type = 'json') {
    return this.fetch.single(this._buildUrl(url), {type})
  }

  // Execute multiple requests in parallel
  _requestMany (urls, type = 'json') {
    urls = urls.map(url => this._buildUrl(url))
    return this.fetch.many(urls, {type})
  }

  // Build the headers for localization and authentication
  _buildUrl (url) {
    // Add the base url
    url = this.baseUrl + url

    // Parse a possibly existing query
    let parsedUrl = parseUrl(url, true)
    let query = parsedUrl.query

    // Only set the API key for authenticated endpoints, when it is required or set on the client
    const usesApiKey = this.isAuthenticated &&
      (!this.isOptionallyAuthenticated || this.client.apiKey !== undefined)

    if (usesApiKey) {
      query['access_token'] = this.client.apiKey
    }

    // Set the language for localized endpoints
    if (this.isLocalized) {
      query['lang'] = this.client.lang
    }

    // Build the new url
    parsedUrl.set('query', query)
    let string = parsedUrl.toString()

    // Clean up the mess by the query parser, and unencode ','
    string = string.replace(/%2C/g, ',')
    return string
  }
}
