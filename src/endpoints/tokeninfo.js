const AbstractEndpoint = require('../endpoint.js')

class TokeninfoEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/tokeninfo'
    this.isAuthenticated = true
  }
}

module.exports = TokeninfoEndpoint
