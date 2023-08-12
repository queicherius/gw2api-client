export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/legends} */
  export interface Legend {
    /** (default/null value: "") - The id of the Legend. */
    id: string
    /** (default/null value: 0) - The id of the profession (swap Legend) skill resolvable against v2/skills. */
    swap: number
    /** (default/null value: 0) - The id of the heal skill resolvable against v2/skills. */
    heal: number
    /** (default/null value: 0) - The id of the elite skill resolvable against v2/skills. */
    elite: number 
    /** List of ids of the utility skills resolvable against v2/skills. */
    utilities: number[]
  }
}

export namespace Schema_2019_12_19 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/legends} */
  export interface Legend extends Schema_1970_01_01.Legend {
    /** The legend code for a build template link. Available on schema version 2019-12-19T00:00:00.000Z or later. */
    code: number
  }
}
