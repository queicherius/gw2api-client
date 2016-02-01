const AbstractEndpoint = require('../endpoint.js')

class BuildEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/build'
  }

  async get () {
    return (await this.request(this.url)).id
  }
}

module.exports = BuildEndpoint
