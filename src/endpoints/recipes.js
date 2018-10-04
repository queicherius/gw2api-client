const AbstractEndpoint = require('../endpoint')

module.exports = class RecipesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/recipes'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.cacheTime = 24 * 60 * 60
  }

  search () {
    return new SearchEndpoint(this)
  }
}

class SearchEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/recipes/search'
    this.cacheTime = 24 * 60 * 60
  }

  input (id) {
    return super.get(`?input=${id}`, true)
  }

  output (id) {
    return super.get(`?output=${id}`, true)
  }
}
