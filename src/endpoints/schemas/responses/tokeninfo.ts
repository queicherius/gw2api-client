import { ISO8601, URL } from "../../../types"

type Permission = 'account' | 'builds' | 'characters' | 'guilds' | 'inventories' | 'progression' | 'pvp' | 'tradingpost' | 'unlocks' | 'wallet'

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/tokeninfo} */
  export interface TokenInfo {
    /** The first half of the API key that was requested. */
    id: number
    /** The name given to the API key by the account owner. Warning: The value of this field is not escaped and may contain valid HTML, JavaScript, other code. Handle with care. */
    name: string
    /** Array of strings describing which permissions the API key has. */
    permissions: Permission[]
  }
}

export namespace Schema_2022_05_19 {
  export interface TokenInfo extends Schema_1970_01_01.TokenInfo {
    type: 'APIKey' | 'Subtoken'
    expires_at: ISO8601
    issued_at: ISO8601
    urls: URL[]
  }
}