const parseUrl = require('url-parse')
const {chunk, unique, flatten} = require('./helpers.js')

class AbstractEndpoint {
  constructor (client) {
    this.client = client
    this.requester = client.requester
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
  async ids () {
    if (!this.isBulk) {
      throw new Error('"ids" is only available for bulk expanding endpoints')
    }

    return await this.request(this.url)
  }

  // Get a single entry by id
  async get (id) {
    if (!this.isBulk) {
      return await this.request(this.url)
    }

    return await this.request(this.url + '?id=' + id)
  }

  // Get multiple entries by ids
  async many (ids) {
    if (!this.isBulk) {
      throw new Error('"many" is only available for bulk expanding endpoints')
    }

    if (ids.length === 0) {
      return []
    }

    let pages = chunk(unique(ids), this.maxPageSize)

    let requests = []
    pages.map(page => {
      requests.push(this.url + '?ids=' + page.join(','))
    })

    let responses = await this.requestMany(requests)
    return flatten(responses)
  }

  // Get a single page
  async page (page, size = this.maxPageSize) {
    if (!this.isBulk && !this.isPaginated) {
      throw new Error('"page" is only available for bulk expanding or paginated endpoints')
    }

    if (size > this.maxPageSize || size <= 0) {
      throw new Error('"size" has to be between 0 and ' + this.maxPageSize + ', was ' + size)
    }

    if (page < 0) {
      throw new Error('page has to be 0 or greater')
    }

    return await this.request(this.url + '?page=' + page + '&page_size=' + size)
  }

  // Get all entries: If the endpoint supports the "all" keyword for bulk
  // expansion it will be used, otherwise it will get all entries by requesting all pages
  async all () {
    if (!this.isBulk && !this.isPaginated) {
      throw new Error('"all" is only available for bulk expanding or paginated endpoints')
    }

    if (this.isBulk && this.supportsBulkAll) {
      return this.request(this.url + '?ids=all')
    }

    let first_page = await this.request(this.url + '?page=0&page_size=' + this.maxPageSize, 'response')
    let result = await first_page.json()
    let total = first_page.headers.get('X-Result-Total')

    if (total <= this.maxPageSize) {
      return result
    }

    let requests = []
    for (let page = 1; page < Math.ceil(total / this.maxPageSize); page++) {
      requests.push(this.url + '?page=' + page + '&page_size=' + this.maxPageSize)
    }

    let responses = await this.requestMany(requests)
    return result.concat(flatten(responses))
  }

  // Executes a single request
  async request (url, type = 'json') {
    return await this.requester.single(this.buildUrl(url), {type})
  }

  // Executes multiple requests in parallel
  async requestMany (urls, type = 'json') {
    urls = urls.map(url => this.buildUrl(url))
    return await this.requester.many(urls, {type})
  }

  // Builds the headers for localization and authentication
  buildUrl (url) {
    // Add the base url
    url = this.baseUrl + url

    // Parse a possibly existing query
    let parsedUrl = parseUrl(url, true)
    let query = parsedUrl.query

    // Only set the API key for authenticated endpoints, when it is
    // required or set on the client
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

module.exports = AbstractEndpoint
