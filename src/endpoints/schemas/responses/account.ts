import { ISO8601 } from "../../../types"

/**
 * - `None` – should probably never happen
 * - `PlayForFree` – without any other flags, this identifies an account which has not yet purchased the game. (This flag does however also appear on accounts who have purchased the base game or any of the expansions)
 * – `GuildWars2` – has purchased the base game
 * - `HeartOfThorns` – has purchased Heart of Thorns, accounts that recieve Heart of Thorns by purchasing Path of Fire will not have this flag set.
 * - `PathOfFire` – has purchased Path of Fire, this flag also implies that the account has access to Heart of Thorns.
 * - `EndOfDragons` – has purchased End of Dragons
 */
type Access = 'None' | 'PlayForFree' | 'GuildWars2' | 'HeartOfThorns' | 'PathOfFire' | 'EndOfDragons'

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/account} */
  export interface Account {
    /** The unique persistent account GUID. */
    id: string
    /** The age of the account in seconds. */
    age: number
    /** The unique account name with numerical suffix. It is possible that the name change. Do not rely on the name, use id instead. */
    name: string
    /** The id of the home world the account is assigned to. Can be resolved against /v2/worlds. */
    world: number
    /** A list of guilds assigned to the given account. */
    guilds: Array<any>
    /** A list of guilds the account is leader of. Requires the additional guilds scope. */
    guild_leader: Array<any>
    /** An ISO-8601 standard timestamp of when the account was created. */
    created: string
    /** A list of what content this account has access to. Possible values: */
    access:  Access[]
    /** True if the player has bought a commander tag. */
    commander: boolean
    /** The account's personal fractal reward level. Requires the additional progression scope. */
    fractal_level: number
    /** The daily AP the account has. Requires the additional progression scope. */
    daily_ap: number
    /** The monthly AP the account has. Requires the additional progression scope. */
    monthly_ap: number
    /** The account's personal wvw rank. Requires the additional progression scope. */
    wvw_rank: number
  }
}

export namespace Schema_2019_02_21 {
  /** {@link https://wiki.guildwars2.com/API:2/account} */
  export interface Account extends Schema_1970_01_01.Account {
    /** An ISO-8601 standard timestamp of when the account information last changed as perceived by the API. This field is only present when a Schema version of 2019-02-21T00:00:00Z or later is requested. */
    last_modified: ISO8601
  }
}

export namespace Schema_2019_12_19 {
  export interface Account extends Schema_2019_02_21.Account {
    /** The amount of build storage slot an account has unlocked. Requires the additional builds scope. This field is only present when a Schema version of 2019-12-19T00:00:00.000Z or later is requested. */
    build_storage_slots: number
  }
}