import { Achievement, BaseCategory, BaseDaily, Group, Product } from "./responses/achievements"
import { Schema as BaseSchema } from './schema'

export namespace Schema_1970_01_01 {
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

    export interface Cat {
        id: number,
        hint: string
    }

    /** {@link https://wiki.guildwars2.com/wiki/API:2/build} */
    export interface Build {
        id: number
    }
}

export interface Schema extends BaseSchema {
    Achievement: Achievement,
    Group: Group,
    Daily: BaseDaily,
    Dailies: Schema_1970_01_01.Dailies,
    Category: Schema_1970_01_01.Category,
    Dungeons: Dungeon
}