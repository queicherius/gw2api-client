import { ISO8601 } from "../../../types"

interface DeliveryItem {
  /** The item's id, resolvable against v2/items. */
  id: number
  /** The amount of this item ready for pickup. */
  count: number
}

interface ListingDetails {
  /** The number of individual listings this object refers to (e.g. two players selling at the same price will end up in the same listing) */
  listings: number
  /** The sell offer or buy order price in coins. */
  unit_price: number
  /** The amount of items being sold/bought in this listing. */
  quantity: number
}


export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/commerce/delivery} */
  export interface Delivery {
    /** The amount of coins ready for pickup. */
      coins: number
      items: DeliveryItem[]
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/commerce/exchange} */
  export interface Exchange {
    /** The number of coins you required for a single gem. */
    coins_per_gem: number
    /** The number of gems you get for the specified quantity of coins. */
    quantity: number
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/commerce/listings} */
  export interface Listing {
    /** The item id. **/
    id: number
    /** A list of all buy listings, descending from highest buy order. */
    buys: ListingDetails[]
    /** A list of all sell listings, ascending from lowest sell offer. */
    sells: ListingDetails[]
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/commerce/prices} */
  export interface Price {
    /** The item id. */
    id: number
    /** Indicates whether or not a free to play account can purchase or sell this item on the trading post. */
    whitelisted: boolean
    /** Buy information. */
    buys: ListingDetails
    /** Sell information. */
    sells: ListingDetails
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/commerce/transactions} */
  interface Transaction {
    /** Id of the transaction. */
    id: number
    /** The item id. */
    item_id: number
    /** The price in coins. */
    price: number
    /** The quantity of the item. */
    quantity: number
    /** The date of creation, using ISO-8601 standard. */
    created: ISO8601
    /** The date of purchase, using ISO-8601 standard. Not shown in current second-level endpoint. */
    purchased: ISO8601
  }

  export type Transactions = Transaction[]
}
