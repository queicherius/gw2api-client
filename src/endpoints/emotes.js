const AbstractEndpoint = require('../endpoint')

module.exports = class EmotesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/emotes'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
