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
}
