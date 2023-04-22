import { AbstractEndpoint } from '../endpoint'
import { ItemID } from '../types'


export class RecipesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/recipes'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.cacheTime = 24 * 60 * 60
  }

  public search (): SearchEndpoint {
    return new SearchEndpoint(this)
  }
}

class SearchEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/recipes/search'
    this.cacheTime = 24 * 60 * 60
  }

  public input (id: ItemID) {
    return super.get(`?input=${id}`, true)
  }

  public output (id: ItemID) {
    return super.get(`?output=${id}`, true)
  }
}
