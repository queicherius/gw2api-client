import { Coordinate, Race as R, URL } from '../../../types'

/**
 * BlueHome - The home borderlands of the blue worlds in WvW.
 * Center - The map in WvW that resides in the center of the borderlands, Eternal Battlegrounds.
 * EdgeOfTheMists - The Edge of the Mists map in WvW.
 * GreenHome - The home borderlands of the green worlds in WvW.
 * Instance - Instances.
 * JumpPuzzle - At present only a WvW map that houses a jumping puzzle of the same name, Obsidian Sanctum.
 * Public - Open world maps.
 * Pvp - PvP as well as activity maps.
 * RedHome - The home borderlands of the red worlds in WvW.
 * Tutorial - The tutorial missions for newly created characters.
 */
type MapType = "BlueHome" | "Center" | "EdgeOfTheMists" | "GreenHome" | "Instance" | "JumpPuzzle" | "Public" | "Pvp" | "RedHome" | "Tutorial"


export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/maps} */
  export interface Map {
    /** The map id. */
    id: number
    /** The map name. */
    name: string
    /** The minimal level of this map. */
    min_level: number
    /** The maximum level of this map. */
    max_level: number
    /** The default floor of this map. */
    default_floor: number
    /** The map type. */
    type: MapType    
    /** A list of available floors for this map. */
    floors: Array<number>
    /** The id of the region this map belongs to. */
    region_id: number
    /** The name of the region this map belongs to. */
    region_name?: string
    /** The id of the continent this map belongs to. */
    continent_id: number
    /** The name of the continent this map belongs to. */
    continent_name: string
    /** The dimensions of the map, given as the coordinates of the lower-left (SW) and upper-right (NE) corners. */
    map_rect: [Coordinate, Coordinate]
    /** The dimensions of the map within the continent coordinate system, given as the coordinates of the upper-left (NW) and lower-right (SE) corners. */
    continent_rect: [Coordinate, Coordinate]
  }

}