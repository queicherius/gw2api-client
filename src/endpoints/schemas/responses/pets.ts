interface Skill {
  id: number
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/pets} */
  export interface Pet {
    /** The codeid of the pet. */
    id: number
    /** The name of the pet. */
    name: string
    /** The description of the pet. */
    description: string
    /** The icon uri for the pet. */
    icon: string
    /** The id of the skill, to be resolved against v2/skills. */
    skills: Skill[]
  }
}
