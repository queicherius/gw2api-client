const AbstractEndpoint = require('../endpoint.js')

class ContinentsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/continents'
    this.isBulk = true
    this.isLocalized = true
  }

  floors (id) {
    return new FloorsEndpoint(this.client, id)
  }
}

class FloorsEndpoint extends AbstractEndpoint {
  constructor (client, continentId) {
    super(client)
    this.url = '/v2/continents/' + continentId + '/floors'
    this.isBulk = true
  }
}

module.exports = ContinentsEndpoint
