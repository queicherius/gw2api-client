export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/materials} */
  export interface Material {
    /** The category id. */
    id: number
    /** The category name. */
    name: string
    /** The ids of the items in this category. */
    items: Array<number>
    /** The order in which the category appears in the material storage. */
    order: number
  }
}