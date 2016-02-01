const AbstractEndpoint = require('../endpoint.js')

class MinisEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/minis'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

module.exports = MinisEndpoint
