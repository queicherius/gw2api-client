const AbstractEndpoint = require('../endpoint')

module.exports = class TokeninfoEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/tokeninfo'
    this.isAuthenticated = true
    this.cacheTime = 60
  }
}
