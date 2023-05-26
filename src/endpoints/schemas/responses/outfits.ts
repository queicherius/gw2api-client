export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/outfits} */
  export interface Outfit {
    /** The id of the outfit. */
    id: number
    /** The name of the outfit (this is also the outfit displayed over a character in-game.) */
    name: string
    /** The icon for the selected outfit. */
    icon: string
    /** An array of item id which unlock this outfit; resolvable against v2/items. */
    unlock_items: number[]
  }
}
