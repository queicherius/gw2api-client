import { AbstractEndpoint } from '../endpoint'

/** {@link https://wiki.guildwars2.com/wiki/API:2/build} */
interface Build {
  id: number
}

export class BuildEndpoint extends AbstractEndpoint<Build> {
  constructor (client) {
    super(client)
    this.url = '/v2/build'
    this.cacheTime = 60
  }

  get () {
    // FIXME: bug? Formerly, no ID was passed, which would cause an error in the nullish check in super.get()
    return super.get(-1).then(result => result.id)
  }
}
