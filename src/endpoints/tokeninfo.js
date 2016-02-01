const AbstractEndpoint = require('../endpoint.js')

class TokeninfoEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/tokeninfo'
    this.isAuthenticated = true
  }

  async get () {
    return await this.request(this.url)
  }
}

module.exports = TokeninfoEndpoint
