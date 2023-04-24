import { AbstractEndpoint } from '../endpoint'


interface Dungeon {
  id: string,
  paths: { id: string, type: 'Story' | 'Explorable' }
}

export class DungeonsEndpoint extends AbstractEndpoint<Dungeon> {
  constructor (client) {
    super(client)
    this.url = '/v2/dungeons'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
