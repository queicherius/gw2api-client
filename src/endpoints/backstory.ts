import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

export class BackstoryEndpoint<S extends Schema> extends AbstractEndpoint<S["Backstory"]> {
  answers () {
    return new AnswersEndpoint<S>(this)
  }

  questions () {
    return new QuestionsEndpoint<S>(this)
  }
}

class AnswersEndpoint<S extends Schema> extends AbstractEndpoint<S["Answers"]> {
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

class QuestionsEndpoint<S extends Schema> extends AbstractEndpoint<S["Questions"]> {
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
