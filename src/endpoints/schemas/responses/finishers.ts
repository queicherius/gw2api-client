export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/finishers} */
  export interface Finisher {
      /** (default/null value: 0) - The id of the finisher. */
      id: number
      /** (default/null value: "") - A description explaining how to acquire the finisher. */
      unlock_details: string
      /** (optional) - An array of item ids used to unlock the finisher. Can be resolved against v2/items */
      unlock_items?: number[]
      /** (default/null value: 0) - The order in which the finisher appears in a list. */
      order: number
      /** (default/null value: "") - The icon uri for the finisher. */
      icon: string
      /** (default/null value: "") - The name of the finisher as it appears in-game. */
      name: string
  }
}