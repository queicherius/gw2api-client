import { ArmorSlot, Attribute, DamageType, Profession, Weapon as WeaponType, WeightClass, Trinket as TrinketType } from "../../../types"
import { Race } from "../../../types"
import { Rarity } from "../../../types"

/**
 * Armor - Armor
 * Back - Back item
 * Bag - Bags
 * Consumable - Consumables
 * Container - Containers
 * CraftingMaterial - Crafting materials
 * Gathering - Gathering tools, baits and lures
 * Gizmo - Gizmos
 * JadeTechModule - Sensory Array and Service Chip modules
 * MiniPet - Miniatures
 * PowerCore - Power Cores
 * Tool - Salvage kits
 * Trait - Trait guides
 * Trinket - Trinkets
 * Trophy - Trophies
 * UpgradeComponent - Upgrade components
 * Weapon - Weapons
 */
type ItemType = "Armor" | "Back" | "Bag" | "Consumable" | "Container" | "CraftingMaterial" | "Gathering" | "Gizmo" | "JadeTechModule" | "MiniPet" | "PowerCore" | "Tool" | "Trait" | "Trinket" | "Trophy" | "UpgradeComponent" | "Weapon"

/**
 * AccountBindOnUse - Account bound on use
 * AccountBound - Account bound on acquire
 * Attuned - If the item is attuned
 * BulkConsume - If the item can be bulk consumed
 * DeleteWarning - If the item will prompt the player with a warning when deleting
 * HideSuffix - Hide the suffix of the upgrade component
 * Infused - If the item is infused
 * NoMysticForge - Not usable in the Mystic Forge
 * NoSalvage - Not salvageable
 * NoSell - Not sellable
 * NotUpgradeable - Not upgradeable
 * NoUnderwater - Not available underwater
 * SoulbindOnAcquire - Soulbound on acquire
 * SoulBindOnUse - Soulbound on use
 * Tonic - If the item is a tonic
 * Unique - Unique
 */
type ItemFlag = "AccountBindOnUse" | "AccountBound" | "Attuned" | "BulkConsume" | "DeleteWarning" | "HideSuffix" | "Infused" | "NoMysticForge" | "NoSalvage" | "NoSell" | "NotUpgradeable" | "NoUnderwater" | "SoulbindOnAcquire" | "SoulBindOnUse" | "Tonic" | "Unique"


/**
 * Activity - Usable in activities
 * Dungeon - Usable in dungeons
 * Pve - Usable in general PvE
 * Pvp - Usable in PvP
 * PvpLobby - Usable in the Heart of the Mists
 * Wvw - Usable in World vs. World
 */
type GameType = "Activity" | "Dungeon" | "Pve" | "Pvp" | "PvpLobby" | "Wvw"


/**
 * AppearanceChange - For Total Makeover Kits, Self-Style Hair Kits, and Name Change Contracts
 * Booze - Alcohol consumables
 * ContractNpc - For Trading Post Express, Merchant Express, Golem Banker, Banker Golem (2 weeks)
 * Currency - Some currencies
 * Food - Food consumables
 * Generic - Various consumables
 * Halloween - Some boosters
 * Immediate - Consumables granting immediate effect (most boosters, Pacified Magical Storm). Also used for currency items that are consumed immediately upon receipt.
 * MountRandomUnlock - For Mount licenses
 * RandomUnlock - For Guaranteed (Armor, Wardrobe, Weapon; Blue-Green Dye, Purple-Gray Dye, Red-Brown Dye, Yellow-Orange Dye) Unlocks
 * Transmutation - Skin consumables
 * Unlock - Unlock consumables
 * UpgradeRemoval - For Upgrade Extractor
 * Utility - Utility items (Potions etc.)
 * TeleportToFriend - Used for Teleport to Friend
 */
type ConsumableType = "AppearanceChange" | "Booze" | "ContractNpc" | "Currency" | "Food" | "Generic" | "Halloween" | "Immediate" | "MountRandomUnlock" | "RandomUnlock" | "Transmutation" | "Unlock" | "UpgradeRemoval" | "Utility" | "TeleportToFriend"


/**
 * BagSlot - For Bag Slot Expansion
 * BankTab - For Bank Tab Expansion
 * Champion - For Mist Champions
 * CollectibleCapacity - For Storage Expander
 * Content - Finishers and Collection unlocks, and Commander's Compendium
 * CraftingRecipe - Crafting recipes
 * Dye - Dyes
 * GliderSkin - For Gliders
 * Minipet - For Miniatures
 * Ms - For Mount Skins
 * Outfit - For Outfits
 * SharedSlot - For Shared Inventory Slots
 */
type UnlockType = "BagSlot" | "BankTab" | "Champion" | "CollectibleCapacity" | "Content" | "CraftingRecipe" | "Dye" | "GliderSkin" | "Minipet" | "Ms" | "Outfit" | "SharedSlot"


/**
 * GiftBox - For some presents and most dye kits
 * Immediate - For containers without a UI (e.g. Pile of Silky Sand, Black Lion Arsenal—Axe, Divine Passage, Iboga Petals)
 * OpenUI - For containers that have their own UI when opening (Black Lion Chest)
 */
type ContainerType = "GiftBox" | "Immediate" | "OpenUI"


/**
 * Foraging - For harvesting sickles
 * Logging - For logging axes
 * Mining - For mining picks
 * Bait - For baits
 * Lure - For lures
 */
type GatheringType = "Foraging" | "Logging" | "Mining" | "Bait" | "Lure"


/**
 * ContainerKey - For Black Lion Chest Keys.
 * RentableContractNpc - For time-limited NPC services (e.g. Golem Banker, Personal Merchant Express)
 * UnlimitedConsumable - For Permanent Self-Style Hair Kit
  */
type GizmoType = "ContainerKey" | "RentableContractNpc" | "UnlimitedConsumable"


/**
 * Default - Infusions and Jewels (and historical PvP runes/sigils)
 * Gem - Universal upgrades (Gemstones, Doubloons, and Marks/Crests/etc.)
 * Rune - Rune
 * Sigil - Sigil
 */
type UpgradeComponentType = "Default" | "Gem" | "Rune" | "Sigil"

interface InfixUpgrade {
  /** The itemstat id that can be resolved against /v2/itemstats. The usual whitelist restrictions apply and not all itemstats may be visible */
  id: number
  attributes: {
    attribute: Attribute
    modifier: number
  }[],
  /** Object containing an additional effect. This is used for Boon Duration, Condition Duration, or additional attribute bonuses for ascended trinkets or back items. */
  buff?: {
    /** The skill id of the effect. */
    skill_id: number
    /**  The effect's description. */
    description?: string
  }
}

/**
 * Enrichment - Item has an enrichment slot.
 * Infusion - Item has an infusion slot.
 */
type InfusionType = 'Enrichment' | 'Infusion'

interface InfusionSlot {
  /** Infusion slot type of infusion upgrades. The array contains a maximum of one value.  */
  flags: InfusionType[]
  /** The infusion upgrade already in the armor piece. Only used for +5 Agony Infusions (id 49428) */
  item_id?: number
}

/** {@link https://wiki.guildwars2.com/API:2/items} */
export interface Item<T> {
  /** The item id. */
  id: number
  /** The chat link. */
  chat_link: string
  /** The item name. */
  name: string
  /** The full icon URL. */
  icon?: string
  /** The item description. */
  description?: string
  /** The item type. */
  type: T  
  /** The item rarity. */
  rarity: Rarity
  /** The required level. */
  level: number
  /** The value in coins when selling to a vendor. (Can be non-zero even when the item has the NoSell flag.) */
  vendor_value: number
  /** The default skin id. */
  default_skin?: number
  /** Flags applying to the item. */
  flags: ItemFlag[]
  /** The game types in which the item is usable. At least one game type is specified. */
  game_types: GameType[]
  /** Restrictions applied to the item. */
  restrictions: (Race | Profession)[]
  /** Lists what items this item can be upgraded into, and the method of upgrading. Each object in the array has the following attributes: */
  upgrades_into?: Array<any>
  /** Describes the method of upgrading. */
  upgrade: string
  /** The item ID that results from performing the upgrade. */
  item_id: number
  /** Lists what items this item can be upgraded from, and the method of upgrading. See upgrades_into for format. */
  upgrades_from?: Array<any>
  /** Additional item details if applicable, depending on the item type (see below). */
  details?: object
}


export namespace Schema_1970_01_01 {

  export interface Armor extends Item<ArmorSlot> {
    /** The weight class of the armor piece. */
    weight_class: WeightClass
    /** The defense value of the armor piece. */
    defense: number
    /** Infusion slots of the armor piece (see below). */
    infusion_slots: InfusionSlot[]
    /** The (x) value to be combined with the (m, gradient) multiplier and (c, offset) value to calculate the value of an attribute using API:2/itemstats. */
    attribute_adjustment: number
    /** The infix upgrade object (see below). */
    infix_upgrade?: InfixUpgrade
    /** The suffix item id. This is usually a rune. */
    suffix_item_id?: number
    /** The secondary suffix item id. Equals to an empty string if there is no secondary suffix item. */
    secondary_suffix_item_id: string
    /** A list of selectable stat IDs which are visible in API:2/itemstats */
    stat_choices?: Array<number>
  }

  export interface BackItem extends Item<'Back'> {
    /** Infusion slots of the back item (see below). */
    infusion_slots: InfusionSlot[]
    /** The (x) value to be combined with the (m, gradient) multiplier and (c, offset) value to calculate the value of an attribute using API:2/itemstats. */
    attribute_adjustment: number
    /** The infix upgrade object (see below). */
    infix_upgrade?: InfixUpgrade
    /** The suffix item id. This is usually a jewel. */
    suffix_item_id?: number
    /** The secondary suffix item id. Equals to an empty string if there is no secondary suffix item. */
    secondary_suffix_item_id: string
    /** A list of selectable stat IDs which are visible in API:2/itemstats */
    stat_choices?: Array<number>
  }

  export interface Bag extends Item<'Bag'> {
    /** The number of bag slots. */
    size: number
    /** Whether the bag is invisible/safe, and contained items won't show up at merchants etc. */
    no_sell_or_sort: boolean
  }

  export interface Consumable extends Omit<Item<ConsumableType>, 'name'> {
    /** Effect description for consumables applying an effect. */
    description?: string
    /** Effect duration in milliseconds. */
    duration_ms?: number
    /** Unlock type for unlock consumables. */
    unlock_type?: UnlockType
    /** The dye id for dye unlocks. */
    color_id?: number
    /** The recipe id for recipe unlocks. */
    recipe_id?: number
    /** Additional recipe ids for recipe unlocks. */
    extra_recipe_ids?: Array<number>
    /** The guild upgrade id for the item; resolvable against API:2/guild/upgrades. */
    guild_upgrade_id?: number
    /** The number of stacks of the effect applied by this item. */
    apply_count?: number
    /** The effect type name of the consumable. */
    name?: string
    /** The icon of the effect. */
    icon?: string
    /** A list of skin ids which this item unlocks; resolvable against API:2/skins. */
    skins?: Array<number>
  }

  export interface Container extends Item<ContainerType> {}

  export interface Gathering extends Item<GatheringType> {}

  export interface Gizmo extends Item<GizmoType> {
    /** The id for the Guild Decoration which will be deposited into the Guild storage uppon consumption of the Item; resolvable against API:2/guild/upgrades. */
    guild_upgrade_id?
  }

  export interface Miniature extends Item<'MiniPet'> {
    /** The miniature it unlocks and can be resolved against /v2/minis */
    minipet_id: number
  }

  export interface SalvageKit extends Item<'Salvage'> {
    /** Number of charges. */
    charges: number
  }

  export interface Trinket extends Item<TrinketType> {
    /** Infusion slots of the trinket (see below). */
    infusion_slots: InfusionSlot[]
    /** The (x) value to be combined with the (m, gradient) multiplier and (c, offset) value to calculate the value of an attribute using API:2/itemstats. */
    attribute_adjustment: number
    /** The infix upgrade object (see below). */
    infix_upgrade?: InfixUpgrade
    /** The suffix item id. This is usually a jewel or gem. */
    suffix_item_id?: number
    /** The secondary suffix item id. Equals to an empty string if there is no secondary suffix item. */
    secondary_suffix_item_id: string
    /** A list of selectable stat IDs which are visible in API:2/itemstats */
    stat_choices?: Array<number>
  }

  export interface UpgradeComponent extends Omit<Item<UpgradeComponentType>, 'flags'> {
    /** The items that can be upgraded with the upgrade component. */
    flags: WeaponType | 'HeavyArmor' | 'MediumArmor' |'LightArmor' | 'Trinket'
    /** Applicable infusion slot for infusion upgrades. */
    infusion_upgrade_flags: InfusionType
    /** Enrichments */
    Enrichment: any
    /** Infusions */
    Infusion: any
    /** The suffix appended to the item name when the component is applied. */
    suffix: string
    /** The infix upgrade object (see below). */
    infix_upgrade: InfixUpgrade
    /** The bonuses from runes. */
    bonuses?: Array<string>
  }

  export interface Weapon extends Item<WeaponType> {
    /** The damage type. */
    damage_type: DamageType
    /** Minimum weapon strength. */
    min_power: number
    /** Maximum weapon strength. */
    max_power: number
    /** The defense value of the weapon (for shields). */
    defense: number
    /** Infusion slots of the weapon (see below). */
    infusion_slots: InfusionSlot[]
    /** The (x) value to be combined with the (m, gradient) multiplier and (c, offset) value to calculate the value of an attribute using API:2/itemstats. */
    attribute_adjustment: number
    /** The infix upgrade object (see below). */
    infix_upgrade?: object
    /** The suffix item id. This is usually a sigil. */
    suffix_item_id?: number
    /** The secondary suffix item id. Equals to an empty string if there is no secondary suffix item. */
    secondary_suffix_item_id: string
    /** A list of selectable stats IDs which are visible in API:2/itemstats */
    stat_choices?: Array<number>
  }
}