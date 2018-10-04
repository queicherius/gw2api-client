const AbstractEndpoint = require('../endpoint')

module.exports = class FilesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/files'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
