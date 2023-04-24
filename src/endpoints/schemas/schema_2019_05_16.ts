import { BaseDaily, RequiredAccess } from "./responses/achievements"

export * from './schema_2019_03_22'

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