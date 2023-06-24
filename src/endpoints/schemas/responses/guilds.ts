// FIXME: probably break this up into multiple files

import { ISO8601 } from "../../../types"

type GuildFlag = 'FlipBackgroundHorizontal' | 'FlipBackgroundVertical'
type StashOperation = 'deposit' | 'withdraw' | 'move'
type UpgradeAction = 'queued' | 'cancelled' | 'completed' | 'sped_up'
// cba, FIXME?
type Permission = string


// EMBLEM STUFF
interface EmblemLayer {
    /** The layer id, to be resolved against /v2/emblem/backgrounds or /v2/emblem/foregrounds respectively */
    id: number
    /** An array of numbers containing the id of each color used. */
    colors: number[]
}

interface Emblem {
  /** An object containing information of the background of the guild emblem. */
  background: EmblemLayer
  /** An object containing information of the foreground of the guild emblem. */
  foreground: EmblemLayer
  /** An array containing the manipulations applied to the logo. */
  flags: GuildFlag[]
}

// LOG STUFF
/** {@link https://wiki.guildwars2.com/API:2/guild/:id/log} */
export interface BaseLog<T> {
  /** An ID to uniquely identify the log entry within the scope of the guild. Not globally unique. */
  id: number
  /** ISO-8601 standard timestamp for when the log entry was created. */
  time: ISO8601
  /** The account name of the guild member who generated this log entry. */
  user?: string
  /** The type of log entry. Additional fields are given depending on the type. */
  type: T   
}

/** user has been invited to the guild. */
interface InvitedLogDetails {
  /** Account name of the guild member which invited the player. */
  invited_by: string
}

/** user has been kicked from the guild. */
interface KickLogDetails {
  /** Account name of the guild member which kicked the player. */
  kicked_by: string
}

/** Rank for user has been changed. */
interface RankChangeLogDetails {
  /** Account name of the guild member which changed the player rank. */
  changed_by: string
  /** Old rank name. */
  old_rank: string
  /** New rank name. */
  new_rank: string
}

/** A guild member has deposited an item into the guild's treasury. */
interface TreasuryLogDetails {
  /** The item ID that was deposited into the treasury. */
  item_id: number
  /** How many of the specified item was deposited. */
  count: number
}

/** - A guild member has deposited/withdrawn an item into the guild stash. */
interface StashLogDetails {
  operation: StashOperation
  /** The item ID that was deposited into the treasury. */
  item_id: number
  /** How many of the specified item was deposited. */
  count: number
  /** How many coins (in copper) were deposited. */
  coins: number
}

/** A guild member has changed the guild's MOTD. */
interface MOTDLogDetails {
  /** The new MOTD. */
  motd: string
}

/** A guild member has interacted with a guild upgrade. Additional fields include: */
interface UpgradeLogDetails {
  /** The type of interaction had. */
  action: UpgradeAction
  /** Having this action will also generate a new count field indicating how many upgrades were added. */
  completed: any
  /** The upgrade ID which was completed. */
  upgrade_id: number
  /** May be added if the upgrade was created through a scribe station by a scribe. */
  recipe_id: number    
}

type JoinedLog = BaseLog<'joined'>
type InvitedLog = BaseLog<'invited'> & InvitedLogDetails
type KickLog = BaseLog<'kick'> & KickLogDetails
type RankChangeLog = BaseLog<'rank_change'> & RankChangeLogDetails
type TreasuryLog = BaseLog<'treasury'> & TreasuryLogDetails
type StashLog = BaseLog<'stash'> & StashLogDetails
type MOTDLog = BaseLog<'motd'> & MOTDLogDetails
type UpgradeLog = BaseLog<'upgrade'> & UpgradeLogDetails

// STASH STUFF
interface InventoryEntry {
  /** ID of the item in this slot. */
  id: number
  /** Amount of items in this slot. */
  count: number
}

// TEAM STUFF
interface TeamMember {
  /** should match up with /v2/guild/:id/members. */
  name: string
  /** "Captain" or "Member". */
  role: 'Captain' | 'Member'
}

interface Season {
  id: string
  wins: number
  losses: number
  rating: number
}

// TREASURY STUFF
interface NeededBy {
  /** The ID of the upgrade needing this item. */
  upgrade_id: number
  /** The total amount the upgrade needs for this item. */
  count: number
}

// UPGRADE STUFF
interface UpgradeCost {
  /** The type of cost. */
  type: 'Item' | 'Collectible' | 'Currency' | 'Coins'
  /** The name of the cost. */
  name: string
  /** The amount needed. */
  count: number
  /** The id of the item, if applicable, resolvable against v2/items. */
  item_id?: number
}


/** {@link https://wiki.guildwars2.com/API:2/guild/upgrades} */
interface BaseUpgrade<T>  {
  /** The upgrade id. */
  id: number
  /** The name of the upgrade. */
  name: string
  /** The guild upgrade description. */
  description: string
  /** The upgrade type. Some upgrade types will add additional fields to describe them further. Possible values: 
   * 
   * - "AccumulatingCurrency": Used for mine capacity upgrades.
   * - "BankBag": Used for guild bank upgrades.
   * - "Boost": Used for permanent guild buffs such as waypoint cost reduction.
   * - "Claimable": Used for guild WvW tactics.
   * - "Consumable": Used for banners and guild siege.
   * - "Decoration": Used for decorations that must be crafted by a Scribe.
   * - "GuildHall": Used for claiming a Guild Hall.
   * - "Hub": Used for the Guild Initiative office unlock.
   * - "Queue": Used for Workshop Restoration 1.
   * - "Unlock": Used for permanent unlocks, such as merchants and arena decorations.
  */
  type: T
  /** A URL pointing to an icon for the upgrade. */
  icon: string
  /** The time it takes to build the upgrade. */
  build_time: number
  /** The prerequisite level the guild must be at to build the upgrade. */
  required_level: number
  /** The amount of guild experience that will be awarded upon building the upgrade. */
  experience: number
  /** An array of upgrade IDs that must be completed before this can be built. */
  prerequisites: Array<string>
  /** An array of objects describing the upgrade's cost. Each object in the array has the following properties: */
  costs: Array<UpgradeCost>

}

interface BankBagUpgradeDetails {
    /** The maximum item slots of the guild bank tab. */
    bag_max_items: number
    /** The maximum amount of coins that can be stored in the bank tab. */
    bag_max_coins: number
}

type BankBagUpgrade = BaseUpgrade<'BankBag'> & BankBagUpgradeDetails
type AccumulatingCurrencyUpgrade = BaseUpgrade<'AccumulatingCurrency'>
type BoostUpgrade = BaseUpgrade<'Boost'>
type ClaimableUpgrade = BaseUpgrade<'Claimable'>
type ConsumableUpgrade = BaseUpgrade<'Consumable'>
type DecorationUpgrade = BaseUpgrade<'Decoration'>
type GuildHallUpgrade = BaseUpgrade<'GuildHall'>
type HubUpgrade = BaseUpgrade<'Hub'>
type QueueUpgrade = BaseUpgrade<'Queue'>
type UnlockUpgrade = BaseUpgrade<'Unlock'>


export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/guild/:id} */
  export interface Guild {
    /** The unique guild id. */
    id: string
    /** The guild's name. */
    name: string
    /** The 2 to 4 letter guild tag representing the guild. */
    tag: string
    /** The guild emblem. */
    emblem: Emblem
    /** The current level of the guild. */
    level: number
    /** The message of the day written out in a single string. */
    motd: string
    /** The guild's current influence. */
    influence: number
    /** The guild's current aetherium level. */
    aetherium: string
    /** The guild's current level of favor. */
    favor: number
    /** The number of People currently in the Guild. */
    member_count: number
    /** The maximum number of People that can be in the Guild. (see Guild#Membership) */
    member_capacity: number
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/guild/:id/log} */
  export type Log = JoinedLog | InvitedLog | KickLog | RankChangeLog | TreasuryLog | StashLog | MOTDLog | UpgradeLog


  /** {@link https://wiki.guildwars2.com/API:2/guild/:id/members} */
  export interface Member {
    /** The account name of the member. */
    name: string
    /** The guild rank of the member. (See /v2/guild/:id/ranks.) */
    rank: string
    /** The time and date the member joined the guild (ISO-8601 standard). May also be null -- the join date was not tracked before around March 19th, 2013. */
    joined: ISO8601
  }

  /** {@link https://wiki.guildwars2.com/API:2/guild/:id/ranks} */
  export interface Rank {
    /** The ID and name of the rank. */
    id: string
    /** A number given to each rank to specify how they should be sorted, lowest being the first and highest being the last. */
    order: number
    /** An array of permission ids from /v2/guild/permissions that have been given to this rank. */
    permissions: Array<Permission>
    /** A URL pointing to the image currently assigned to this rank. */
    icon: string
  }



  /** {@link https://wiki.guildwars2.com/API:2/guild/:id/stash} */
  export interface Stash {
    /** ID of the guild upgrade that granted access to this section of the guild vault. */
    upgrade_id: number
    /** The number of slots in this section of the guild vault. */
    size: number
    /** The number of coins deposited in this section of the guild vault. */
    coins: number
    /** The description set for this section of the guild's vault. */
    note: string
    /** An array of objects describing the items in the guild stash of exactly size length. Each object either contains the following properties if an item is present, or is null if the slot is empty: */
    inventory: Array<InventoryEntry>
  }

  /** {@link https://wiki.guildwars2.com/API:2/guild/:id/storage} */
  export interface Storage {
    /** ID of the guild consumable. */
    id: number
    /** Amount of the consumable in storage. */
    count: number
  }

  /** {@link https://wiki.guildwars2.com/API:2/guild/:id/teams} */
  export interface Team {
    /** the team ID, only unique within a guild. */
    id: number
    members: TeamMember[]
    /** matches the format of /v2/pvp/stats. */
    aggregate: object  // FIXME: infer
    /** matches the format of /v2/pvp/stats. */
    ladders: object  // FIXME: infer
    /** matches the format of /v2/pvp/games with profession omitted. */
    games: object[]  // FIXME: infer
    /** Amount of items in this slot. */
    seasons: Season[]
  }


  /** {@link https://wiki.guildwars2.com/API:2/guild/:id/treasury} */
  export interface Treasury {
    /** The item's ID. */
    item_id: number
    /** How many of the item are currently in the treasury. */
    count: number
    /** An array of objects describing which currently in-progress upgrades are needing this item. Each object has the following properties: */
    needed_by: Array<NeededBy>

  }

  // FIXME: do we need the https://wiki.guildwars2.com/wiki/API:2/guild/:id/upgrades one?
  /** {@link https://wiki.guildwars2.com/wiki/API:2/guild/upgrades} */
  export type Upgrade = BankBagUpgrade 
  | AccumulatingCurrencyUpgrade 
  | BoostUpgrade 
  | ClaimableUpgrade 
  | ConsumableUpgrade 
  | DecorationUpgrade 
  | GuildHallUpgrade 
  | HubUpgrade 
  | QueueUpgrade 
  | UnlockUpgrade

  /** {@link https://wiki.guildwars2.com/API:2/guild/permissions} */
  export interface Permission {
    /** The permission id. */
    id: string
    /** The name of the permission. */
    name: string
    /** The description of the permission. */
    description: string
  }

  /** {@link https://wiki.guildwars2.com/API:2/guild/search} */
  export type Search = string[]


}