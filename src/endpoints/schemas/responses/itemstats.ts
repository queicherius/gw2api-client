import { Attribute, Race as R, URL } from '../../../types'

interface AttributeModifier {
    /** The name of the attribute, may be one of the following: */
    attribute: Attribute
    /** The multiplier number for that attribute.  */
    multiplier: number
    /** The value number for that attribute. */
    value: number
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/itemstats} */
  export interface Itemstats {
    /** The itemstat id. */
    id: number
    /** The name of the set of stats. */
    name: string
    /** List of attribute bonuses. Each object may contain the following : */
    attributes: AttributeModifier[]
  }
}