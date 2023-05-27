interface MasteryLevel {
    /** The name for the given mastery. */
    name: string
    /** The in game description for the given mastery. */
    description: string
    /** The in game instructions for the given mastery. */
    instruction: string
    /** The icon uri for the mastery. */
    icon: string
    /** The amount of mastery points required to unlock the mastery. */
    point_cost: number
    /** The total amount of experience needed to train the given mastery level. This total is non-cumulative between levels. */
    exp_cost: number
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/masteries} */
  export interface Mastery {
    /** The id of the mastery. */
    id: number
    /** The name of the selected mastery. */
    name: string
    /** The written out requirements to unlock the mastery track. */
    requirement: string
    /** The order in which the mastery track appears in a list. */
    order: number
    /** The background uri for the mastery track. */
    background: string
    /** The in-game region in which the mastery track belongs. */
    region: string
    /** An array containing the information of each mastery level. */
    levels: Array<MasteryLevel>
  }
}