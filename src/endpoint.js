import parseUrl from 'url-parse'
import {chunk, unique, flatten} from './helpers'

export default class AbstractEndpoint {
  constructor (client) {
    this.client = client
    this.fetch = client.fetch
    this.baseUrl = 'https://api.guildwars2.com'
    this.isPaginated = false
    this.maxPageSize = 200
    this.isBulk = false
    this.supportsBulkAll = true
    this.isLocalized = false
    this.isAuthenticated = false
    this.isOptionallyAuthenticated = false
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

  // All ids of this endpoint
  ids () {
    return new Promise((resolve, reject) => {
      if (!this.isBulk) {
        return reject(new Error('"ids" is only available for bulk expanding endpoints'))
      }

      this.request(this.url).then(resolve).catch(reject)
    })
  }

  // Get a single entry by id
  get (id) {
    if (!this.isBulk) {
      return this.request(this.url)
    }

    return this.request(`${this.url}?id=${id}`)
  }

  // Get multiple entries by ids
  many (ids) {
    return new Promise((resolve, reject) => {
      if (!this.isBulk) {
        return reject(new Error('"many" is only available for bulk expanding endpoints'))
      }

      // Exit out early if we don't request any ids
      if (ids.length === 0) {
        return resolve([])
      }

      // Chunk the requests to the max page size
      let pages = chunk(unique(ids), this.maxPageSize)
      let requests = pages.map(page => `${this.url}?ids=${page.join(',')}`)

      // Work on all requests in parallel and then flatten the responses into one
      this.requestMany(requests)
        .then(responses => resolve(flatten(responses)))
        .catch(reject)
    })
  }

  // Get a single page
  page (page, size = this.maxPageSize) {
    return new Promise((resolve, reject) => {
      if (!this.isBulk && !this.isPaginated) {
        return reject(new Error('"page" is only available for bulk expanding or paginated endpoints'))
      }

      if (size > this.maxPageSize || size <= 0) {
        return reject(new Error(`"size" has to be between 0 and ${this.maxPageSize}, was ${size}`))
      }

      if (page < 0) {
        return reject(new Error('page has to be 0 or greater'))
      }

      this.request(`${this.url}?page=${page}&page_size=${size}`)
        .then(resolve)
        .catch(reject)
    })
  }

  // Get all entries
  all () {
    return new Promise((resolve, reject) => {
      if (!this.isBulk && !this.isPaginated) {
        return reject(new Error('"all" is only available for bulk expanding or paginated endpoints'))
      }

      // If the endpoint supports the "all" keyword, bulk expansion will be used
      if (this.isBulk && this.supportsBulkAll) {
        this.request(`${this.url}?ids=all`).then(resolve).catch(reject)
        return
      }

      // If it does not, we'll request all pages
      let totalEntries
      this.request(`${this.url}?page=0&page_size=${this.maxPageSize}`, 'response')
        .then(firstPage => {
          // Get the total number of entries off the first page's headers
          totalEntries = firstPage.headers.get('X-Result-Total')
          return firstPage.json()
        })
        .then(result => {
          // If the first page already includes all entries, we are done
          if (totalEntries <= this.maxPageSize) {
            return resolve(result)
          }

          // If not, request all missing pages in parallel
          let requests = []
          for (let page = 1; page < Math.ceil(totalEntries / this.maxPageSize); page++) {
            requests.push(`${this.url}?page=${page}&page_size=${this.maxPageSize}`)
          }

          this.requestMany(requests)
            .then(responses => resolve(result.concat(flatten(responses))))
            .catch(reject)
        })
        .catch(reject)
    })
  }

  // Executes a single request
  request (url, type = 'json') {
    return this.fetch.single(this.buildUrl(url), {type})
  }

  // Executes multiple requests in parallel
  requestMany (urls, type = 'json') {
    urls = urls.map(url => this.buildUrl(url))
    return this.fetch.many(urls, {type})
  }

  // Builds the headers for localization and authentication
  buildUrl (url) {
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
