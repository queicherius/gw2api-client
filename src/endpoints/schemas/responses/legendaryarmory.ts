/** 
 * - 1: Armor items, Back items and most Trinkets (except the ring Conflux)
 * - 2: Focus, Greatsword, Hammer, Harpoon, Longbow, Rifle, Scepter, Shield, Short bow, Speargun, Staff, Torch, Trident and Warhorn. Also applies to Conflux.
 * - 4: Axe, Dagger, Mace, Pistol, Sword
 * - 7: Rune
 * - 8: Sigil
 */
type Quantity = 1 | 2 | 4 | 7 | 8

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/legendaryarmory} */
  export interface Legendaryarmory {
    /** The item id of the Legendary Armor item. */
    id: number
    /** The maximum quantity of Legendary Armory items that can be stored on an account. */
    max_count: Quantity
  }
}