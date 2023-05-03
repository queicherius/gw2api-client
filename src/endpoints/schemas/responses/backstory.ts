import { Profession, Race } from "../../../types"

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/characters/:id/backstory} */
  export interface Backstory {
    backstory: string[]
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/backstory/answers} */
  export interface Answer {
    id: string,
    title: string,
    description: string,
    journal: string,
    question: number,
    professions: Profession[],
    races: Race[],
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/backstory/questions} */
  export interface Question {
    id: number,
    title: string,
    description: string,
    answer: number[],
    order: number,
    races: Race[],
    professions: Profession[]
  }
}
