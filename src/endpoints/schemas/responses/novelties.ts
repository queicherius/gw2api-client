type Slot = 'Chair' | 'Music' | 'HeldItem' | 'Miscellaneous' | 'Tonic'

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/novelties} */
  export interface Novelty {
    /** The id of the novelty. */
    id: number
    /** The name of the novelty as it appears in-game. */
    name: string
    /** The in-game novelty description. */
    description: string
    /** The icon url for the novelty. */
    icon: string
    /** The slot which the novelty appears in the UI for. */
    slot: Slot
    /** An array of item ids used to unlock the novelty. Can be resolved against v2/items */
    unlock_item: number[]
  }
}
