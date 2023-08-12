import { AbstractEndpoint } from '../endpoint'
export class SkillsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/skills'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
