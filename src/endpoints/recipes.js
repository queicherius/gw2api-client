import AbstractEndpoint from '../endpoint'

export default class RecipesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/recipes'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
  }

  search () {
    return new SearchEndpoint(this.client)
  }
}

class SearchEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/recipes/search'
  }

  input (id) {
    return this.request(`${this.url}?input=${id}`)
  }

  output (id) {
    return this.request(`${this.url}?output=${id}`)
  }
}
