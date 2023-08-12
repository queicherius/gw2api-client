interface Goal {
    /** The text displayed for the quest step if it is active. */
    active: string
    /** The text displayed for the quest step if it is complete. */
    complete: string
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/quests} */
  export interface Quest {
    /** The id of the quest. */
    id: number
    /** The name of the quest. */
    name: string
    /** The minimum level required for a character to begin this quest. */
    level: number
    /** The id for the story; resolvable against v2/stories. */
    story: string
    /** An array of goal objects providing details about the goals for this quest. */
    goals: Goal[]
  }
}