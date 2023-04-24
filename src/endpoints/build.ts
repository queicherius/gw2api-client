import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

// FIXME: move id into superclass somewhere
export class BuildEndpoint<S extends Schema> extends AbstractEndpoint<S["Build"] & {id: number}> {
  constructor (client) {
    super(client)
    this.url = '/v2/build'
    this.cacheTime = 60
  }

  get (): Promise<number> {
    // FIXME: bug? Formerly, no ID was passed, which would cause an error in the nullish check in super.get()
    return super.get(-1).then(result => result.id)
  }
}
