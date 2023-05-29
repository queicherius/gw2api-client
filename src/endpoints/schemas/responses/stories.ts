import { Race } from "../../../types"

// FIXME: are there more?
type StoryFlag = 'RequiresUnlock'

interface Chapter {
  /** The name of the chapter. */
  name: string
}

export namespace Schema_1970_01_01 {
  /** @link {https://wiki.guildwars2.com/wiki/API:2/stories} */
  export interface Story {
    /** The id of the story. */
    id: number
    /** The id for the story season; resolvable against v2/stories/seasons. */
    season: string
    /** The name of the story. */
    name: string
    /** The description of the story. */
    description: string
    /** The (in-game, not real-world) date of the story. */
    timeline: string
    /** The minimum level required for a character to begin this story. */
    level: number
    /** The order in which this story is displayed in the Story Journal. */
    order: number
    /** An array of chapter objects providing details about the chapters for this story. */
    chapters: Chapter[]
    races?: Race[]
    flags?: StoryFlag[]
  }
}
