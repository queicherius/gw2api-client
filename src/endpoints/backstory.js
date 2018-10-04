const AbstractEndpoint = require('../endpoint')

module.exports = class BackstoryEndpoint extends AbstractEndpoint {
  answers () {
    return new AnswersEndpoint(this)
  }

  questions () {
    return new QuestionsEndpoint(this)
  }
}

class AnswersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/backstory/answers'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class QuestionsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/backstory/questions'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
