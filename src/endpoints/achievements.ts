import { AbstractEndpoint } from '../endpoint'


type Flag = 'PvE' | 'PvP' | 'WvW' | 'SpecialEvent'
type Product = 'GuildWars2' | 'HeartOfThorns' | 'PathOfFire' | 'EndOfDragons'
type Condition = 'HasAccess' | 'NoAccess'
type LevelTuple = [number, number]
type LevelObj = { min: number, max: number }
type RequiredAccess = { product: Product, condition: Condition }

export namespace SchemaOld {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily} */
  type Daily = {
    id: number,
    level: LevelObj,
    required_access: Product[]
  }
  
  /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily/tomorrow} */
  export interface Dailies {
    pve: Daily[],
    wvw: Daily[],
    fractals: Daily[],
    special: Daily[]
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories} */
  export interface Category {
    id: number,
    name: string,
    description: string,
    order: number,
    icon: string,
    achievements: number[],
  }
}

// If using schema 2019-05-16T00:00:00.000Z or later 
export namespace SchemaNew {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily} */
  type Daily = {
    id: number,
    level: LevelObj,
    required_access?: RequiredAccess
  }
  
  /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily/tomorrow} */
  export interface Dailies {
    pve: Daily[],
    wvw: Daily[],
    fractals: Daily[],
    special: Daily[]
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories} */
  export interface Category {
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
  }
}

/** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/groups} */
interface Group {
  id: string,
  name: string,
  description: string,
  order: number,
  categories: number[]
}

/** {@link https://wiki.guildwars2.com/wiki/API:2/account/achievements} */
interface Achievement {
  id: number,
  bits?: number,
  current?: number,
  max?: number,
  done: boolean,
  repeated?: number,
  unlocked?: number
}


export class AchievementsEndpoint extends AbstractEndpoint<Achievement> {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }

  categories () {
    return new CategoriesEndpoint(this)
  }

  groups () {
    return new GroupsEndpoint(this)
  }

  daily () {
    return new DailyEndpoint(this)
  }

  dailyTomorrow () {
    return new DailyTomorrowEndpoint(this)
  }
}

class CategoriesEndpoint<T extends SchemaNew.Category | SchemaOld.Category> extends AbstractEndpoint<T> {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/categories'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}


class GroupsEndpoint extends AbstractEndpoint<Group> {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/groups'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class DailyEndpoint<T extends SchemaOld.Dailies | SchemaOld.Dailies> extends AbstractEndpoint<T> {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/daily'
    this.cacheTime = 60 * 60
  }
}

class DailyTomorrowEndpoint<T extends SchemaOld.Dailies | SchemaOld.Dailies> extends AbstractEndpoint<T> {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/daily/tomorrow'
    this.cacheTime = 60 * 60
  }
}
