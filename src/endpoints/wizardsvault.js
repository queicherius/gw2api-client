const AbstractEndpoint = require('../endpoint')

module.exports = class WizardsvaultEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wizardsvault'
    this.isLocalized = true
    this.cacheTime = 60 * 60
  }

  listings () {
    return new ListingsEndpoint(this)
  }

  objectives () {
    return new ObjectivesEndpoint(this)
  }
}

class ListingsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wizardsvault/listings'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = false
    this.cacheTime = 60 * 60
  }
}

class ObjectivesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/wizardsvault/objectives'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 60 * 60
  }
}
