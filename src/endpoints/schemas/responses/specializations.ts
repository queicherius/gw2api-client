import { URL } from "../../../types"

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/specializations} */
  export interface Specialization {
    /** The specialization's ID. */
    id: number
    /** The name of the specialization. */
    name: string
    /** The profession that this specialization belongs to. */
    profession: string
    /** true if this specialization is an Elite specialization, false otherwise. */
    elite: boolean
    /** A URL to an icon of the specialization. */
    icon: URL
    /** A URL to the background image of the specialization. */
    background: URL
    /** Contains a list of IDs specifying the minor traits in the specialization. */
    minor_traits: Array<number>
    /** Contains a list of IDs specifying the major traits in the specialization. */
    major_traits: Array<number>
  }
}