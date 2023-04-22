import { AbstractEndpoint } from '../endpoint'

export class FilesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/files'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
