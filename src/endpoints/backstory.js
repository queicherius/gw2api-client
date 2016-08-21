const AbstractEndpoint = require('../endpoint.js')

class BackstoryEndpoint extends AbstractEndpoint {
  answers () {
    return new AnswersEndpoint(this.client)
  }

  questions () {
    return new QuestionsEndpoint(this.client)
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
  }
}

module.exports = BackstoryEndpoint
