import { Race as R } from '../../../types'

export namespace Schema_1970_01_01 {
  /** @link {https://wiki.guildwars2.com/wiki/API:2/races} */
  export interface Race {
    // FIXME: better alias?
    id: R
    skills: number[]
  }
}