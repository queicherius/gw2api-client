import { URL } from "../../../types"

type Flag = 'Default'

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/mailcarriers} */
  export interface Mailcarrier {
    /** The id of the mail carrier. */
    id: number
    /** An array of item ids used to unlock the mailcarrier. Can be resolved against v2/items */
    unlock_items?: number[]
    /** The order in which the mailcarrier appears in a list. */
    order: number
    /** The icon uri for the mail carrier. */
    icon: URL
    /** The name of the mailcarrier as it appears in-game. */
    name: string
    /** Additional flags on the item, such as "Default" */
    flags: Flag[]
  }
}
