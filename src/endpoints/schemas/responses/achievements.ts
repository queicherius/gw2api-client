export type Flag = 'PvE' | 'PvP' | 'WvW' | 'SpecialEvent'
export type Product = 'GuildWars2' | 'HeartOfThorns' | 'PathOfFire' | 'EndOfDragons'
export type Condition = 'HasAccess' | 'NoAccess'
export type LevelTuple = [number, number]
export type LevelObj = { min: number, max: number }
export type RequiredAccess = { product: Product, condition: Condition }

/** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily} */
interface BaseDaily {
    id: number,
    level: LevelObj,
}

/** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories} */
interface BaseCategory {}


export namespace Schema_1970_01_01 {
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


    export interface Daily extends BaseDaily {
        required_access: Product[]
    }

    /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily/tomorrow} */
    export interface Dailies {
        pve: Daily[],
        wvw: Daily[],
        fractals: Daily[],
        special: Daily[]
    }

    export interface Category extends BaseCategory {
        id: number,
        name: string,
        description: string,
        order: number,
        icon: string,
        achievements: number[],
    }

    /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/groups} */
    export interface Group {
        id: string,
        name: string,
        description: string,
        order: number,
        categories: number[]
    }
}


export namespace Schema_2019_05_16 {
    export interface Daily extends BaseDaily {
        required_access?: RequiredAccess
    }

    /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily/tomorrow} */
    export interface Dailies {
        pve: Daily[],
        wvw: Daily[],
        fractals: Daily[],
        special: Daily[]
    }
}


export namespace Schema_2022_03_23 {
    /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories} */
    export interface Category extends BaseCategory {
        achievements: [
            id: number,
            name: string,
            description: string,
            order: number,
            icon: string,
            achievements: { 
                id: number,
                required_access: RequiredAccess
                flags: Flag[],
                level: [number, number]
            },
            tomorrow: {
                id: number,
                required_access: RequiredAccess,
                flags: Flag[],
                level: LevelTuple
            }
        ]
    }
}