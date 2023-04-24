export type Flag = 'PvE' | 'PvP' | 'WvW' | 'SpecialEvent'
export type Product = 'GuildWars2' | 'HeartOfThorns' | 'PathOfFire' | 'EndOfDragons'
export type Condition = 'HasAccess' | 'NoAccess'
export type LevelTuple = [number, number]
export type LevelObj = { min: number, max: number }
export type RequiredAccess = { product: Product, condition: Condition }

/** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily} */
export interface BaseDaily {
    id: number,
    level: LevelObj,
}

/** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories} */
export interface BaseCategory {}

/** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/groups} */
export interface Group {
    id: string,
    name: string,
    description: string,
    order: number,
    categories: number[]
}
  
/** {@link https://wiki.guildwars2.com/wiki/API:2/account/achievements} */
export interface Achievement {
    id: number,
    bits?: number,
    current?: number,
    max?: number,
    done: boolean,
    repeated?: number,
    unlocked?: number
}
