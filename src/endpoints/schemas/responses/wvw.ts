import { Coordinate, Coordinate3, URL } from "../../../types"

type Faction = 'red' | 'blue' | 'green'
type FactionData<T> = { [key in Faction]: T }
type ObjectiveType =  'Spawn' | 'Camp' | 'Ruins' | 'Tower' | 'Keep' | 'Castle' | 'Mercenary'
type WvWMap = 'RedHome' | 'GreenHome' | 'BlueHome' | 'Center'


interface Rank {
  /** The cost in WvW experience points to purchase the ability. */
  cost: number
  /** The effect given to players for obtaining the given ability rank. */
  effect: string
}

interface MatchObjective {
  /** The objective id. */
  id: string
  /** The objective type, with possible values Spawn, Camp, Ruins, Tower, Keep, Castle, and Mercenary (Dredge/Krait/Frogs). */
  type: ObjectiveType
  /** The current owner of the objective. Can be any one of Red, Green, Blue or Neutral. */
  owner: Faction | 'Neutral'
  /** The time at which this objective was last captured by a server. (ISO-8601 Standard) */
  last_flipped: string
  /** The guild id of the guild currently claiming the objective, or null if not claimed. (Not present for unclaimable objectives.) */
  claimed_by?: string
  /** The time the objective was claimed by the claimed_by guild (ISO-8601 Standard), or null if not claimed. (Not present for unclaimable objectives.) */
  claimed_at?: string
  /** The amount of points per tick the given objective yields. */
  points_tick: number
  /** The amount of points awarded for capturing the objective. */
  points_capture: number
  /** An array of ids, resolvable against v2/guild/upgrades, showing which guild upgrades are currently slotted. */
  guild_upgrades?: number[]
  /** The total amount of yak shipments delivered to the objective. Not limited to the shipments within the current tier only. */
  yaks_delivered?: number
}

interface Bonus {
  /** A shorthand name for the bonus. Currently can only be Bloodlust. */
  type: 'Bloodlust'
  /** The color representing which world group owns the bloodlust. */
  owner: Faction
}



interface Map {
  /** The map id */
  id: number
  /** The identifier for the map. Can be either RedHome, GreenHome or BlueHome for the borderlands or Center for Eternal Battlegrounds. */
  type: WvWMap
  /** An object containing the score of the three servers for only the specified map, under the values red, blue, and green. */
  scores: FactionData<number>
  /** An object containing the total kills of the three servers for only the specified map, under the values red, blue, and green. */
  kills: FactionData<number>
  /** An object containing the total deaths of the three servers for only the specified map, under the values red, blue, and green. */
  deaths: FactionData<number>
  /** A list of objective objects for this map. Each object contains the following properties: */
  objectives: Array<MatchObjective>
  /** A list of all bonuses being granted by this map.  If no player team owns a bonus from the map, this list is empty. */
  bonuses: Array<Bonus>
}


interface MapScore {
  /** Which map is being looked at, can have the values "Center", "RedHome", "BlueHome", or "GreenHome" */
  type: WvWMap
  /** Object containing total scores for each team color on the selected map, under the values red, blue, and green. */
  scores: FactionData<number>
}


interface Skirmish {
  /** The skirmish id */
  id: number
  /** Object containing total scores for each team color, under the values red, blue, and green. */
  scores: FactionData<number>
  /** Contains the map specific scores for the specific skirmish. */
  map_scores: Array<MapScore>
}

interface Upgrade {
  /** The name of the upgrade tier. */
  name: string
  /** The given description for this upgrade. */
  description: string
  /** The url/image link for the upgrade's icon. */
  icon: URL
}

interface Tier {
  /** The name of the upgrade tier. */
  name: string
  /** The number of required yaks. */
  yaks_required: number
  upgrades: Array<Upgrade>
}


export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/wvw/abilities} */
  export interface Ability {
    /** The id of the abilities. */
    id: number
    /** The given name for the WvW ability. */
    name: string
    /** The given description for the WvW ability. */
    description: string
    /** The uri for the ability's icon. */
    icon: URL
    ranks: Array<Rank>
  }


  /** {@link https://wiki.guildwars2.com/API:2/wvw/matches} */
  export interface Match {
    /** The WvW match id. */
    id: string
    /** The starting time of the matchup. (ISO-8601 Standard) */
    start_time: string
    /** The ending time of the matchup. (ISO-8601 Standard) */
    end_time: string
    /** An object containing the score of the three servers, under the values red, blue, and green. */
    scores: object
    /** An object containing the IDs of the three primary matchup worlds. */
    worlds: FactionData<number>
    /** An object containing the world IDs of the three combined servers, under the values red, blue, and green. */
    all_worlds: FactionData<number[]>
    /** An object containing the total deaths of the three servers, under the values red, blue, and green. */
    deaths: FactionData<number>
    /** An object containing the total kills of the three servers, under the values red, blue, and green. */
    kills: FactionData<number>
    /** An object containing the victory points of the three servers, under the values red, blue, and green. */
    victory_points: FactionData<number>
    /** A list of objects containing detailed information about each of the four maps. The map detail objects contain the following properties: */
    maps: Array<Map>
    skirmishes: Array<Skirmish>
  }

  /** {@link https://wiki.guildwars2.com/API:2/wvw/objectives} */
  export interface Objective {
    /** The objective id. */
    id: string
    /** The name of the objective. */
    name: string
    /** The type of the objective. Possible values include: */
    type: string
    /** The map sector the objective can be found in. (See /v2/continents.) */
    sector_id: any
    /** The ID of the map that this objective can be found on. */
    map_id: number
    /** The map that this objective can be found on. One of: GreenHome, BlueHome, RedHome, Center, or EdgeOfTheMists. */
    map_type: string
    /** An array of three numbers representing the X, Y and Z coordinates of the objectives marker on the map. */
    coord: Coordinate3
    /** An array of two numbers representing the X and Y coordinates of the sector centroid. */
    label_coord: Coordinate
    /** The icon link */
    marker: URL
    /** The chat code for the observed objective. */
    chat_link: string
    /** The upgrade id to be resolved against v2/wvw/upgrades. */
    upgrade_id: number
  }


  /** {@link https://wiki.guildwars2.com/API:2/wvw/ranks} */
  export interface Rank {
    /** The id of the rank. */
    id: number
    /** The given title for the WvW rank. */
    title: string
    /** The minimum WvW level required to be at this rank. */
    min_rank: number
  }

  /** {@link https://wiki.guildwars2.com/API:2/wvw/upgrades} */
  export interface Upgrade {
    /** The upgrade id. */
    id: string
    tiers: Array<Tier>
  }
}