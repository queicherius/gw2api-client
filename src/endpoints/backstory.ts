import { AbstractEndpoint } from '../endpoint'
import { Profession, Race } from '../types'

/** {@link https://wiki.guildwars2.com/wiki/API:2/characters/:id/backstory} */
interface Backstory {
  backstory: string[]
}

/** {@link https://wiki.guildwars2.com/wiki/API:2/backstory/answers} */
interface Answer {
  id: string,
  title: string,
  description: string,
  journal: string,
  question: number,
  professions: Profession[],
  races: Race[],
}

/** {@link https://wiki.guildwars2.com/wiki/API:2/backstory/questions} */
interface Question {
  id: number,
  title: string,
  description: string,
  answer: number[],
  order: number,
  races: Race[],
  professions: Profession[]
}

export class BackstoryEndpoint extends AbstractEndpoint<Backstory> {
  answers () {
    return new AnswersEndpoint(this)
  }

  questions () {
    return new QuestionsEndpoint(this)
  }
}

class AnswersEndpoint extends AbstractEndpoint<Answer> {
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

class QuestionsEndpoint extends AbstractEndpoint<Question> {
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
