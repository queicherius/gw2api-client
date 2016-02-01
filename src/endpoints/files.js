const AbstractEndpoint = require('../endpoint.js')

class FilesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/files'
    this.isPaginated = true
    this.isBulk = true
  }
}

module.exports = FilesEndpoint
