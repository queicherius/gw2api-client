import { URL } from "../../../types"

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/minis} */
  export interface Mini {
    /** The mini id. */
    id: number
    /** The mini name. */
    name: string
    /** A description of how to unlock the mini (only present on a few entries). */
    unlock: string
    /** The mini icon. */
    icon: URL
    /** The sort order that is used for displaying the mini in-game. */
    order: number
    /** The item which unlocks the mini and can be resolved against /v2/items */
    item_id: number
  }
}
