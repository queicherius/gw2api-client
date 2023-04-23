import { AbstractEndpoint } from '../endpoint'


export namespace SchemaOld {
  export interface Cat {
    id: number,
    hint: string
  }
}

export namespace SchemaNew {
  export type Cat = number
}

export class CatsEndpoint<T extends SchemaOld.Cat | SchemaNew.Cat> extends AbstractEndpoint<T> {
  constructor (client) {
    super(client)
    this.url = '/v2/cats'
    this.isPaginated = true
    this.isBulk = true
    this.cacheTime = 24 * 60 * 60
  }
}
