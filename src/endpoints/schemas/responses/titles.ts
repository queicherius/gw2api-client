export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/titles} */
  export interface Title {
    /** The id of the title. */
    id: number
    /** The name of the title (this is also the title displayed over a character in-game.) */
    name: string
    /** (Now depreciated) - The id of the achievement that grants this title; resolvable against v2/achievements. */
    achievement: number
    /** The id of the achievement that grants this title; resolvable against v2/achievements. */
    achievements: number[]
    /** The amount of AP required to have said title. */
    ap_required: number
  }
}
