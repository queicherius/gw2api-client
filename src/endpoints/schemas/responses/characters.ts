// FIXME: https://wiki.guildwars2.com/wiki/API:2/characters heropoints, quests, and sab missing

import { Race, Gender, Profession, ISO8601, Discipline, EquipmentSlot } from "../../../types"

type WeaponAttribute = 'AgonyResistance' | 'BoonDuration' | 'ConditionDamage' | 'ConditionDuration' | 'CritDamage' | 'Healing' | 'Power' | 'Precision' | 'Toughness' | 'Vitality'
type Binding = 'Character' | 'Account'

// BUILDTABS
interface BuildSpecialization {
  /** The specialization id or null if none is selected. Resolvable against /v2/specializations. */
  id: number
  /** Three trait ids or null in places where none is selected. Resolvable against /v2/traits. */
  traits: number[]
}

interface BuildSkills {
  /** The id of the heal skill or null if none is selected. */
  heal: number
  /** Three utility skill ids or null in places where none is selected. */
  utilities: number[]
  /** The id of the elite skill or null if none is selected. */
  elite: number
}

interface BuildPets {
  /** Containers the two pet ids the ranger has equipped for terrestrial combat. */
  terrestrial: [number, number]
  /** Containers the two pet ids the ranger has equipped for aquaticcombat. */
  aquatic: [number, number]
}

interface Build {
  /** The name given to the build. */
  name: string
  /** The characters profession. Resolvable against /v2/professions. */
  profession: string
  /** Three objects providing information about the characters selected specializations. */
  specializations: [BuildSpecialization, BuildSpecialization, BuildSpecialization]
  /** Contains information about the characters selected skills. All values may be resolved against /v2/skills. */
  skills: BuildSkills
  /** Contains information about the characters selected underwater skills. The structure is the same as the one of skills above. */
  aquatic_skills: BuildSkills
  /** Included for revenants only. Two legend ids or null in places where none is selected. Resolvable against /v2/legends. */
  legends?: [string | null, string | null]
  /** Included for revenants only. The structure is the same as the one of legends above. */
  aquatic_legends?: [string | null, string | null]
  /** Included for rangers only. Containers information about the characters selected pets. Resolvable against /v2/pets. */
  pets: BuildPets
}

// EQUIPMENT

interface EquipmentTabDetails {
  /** The item id of the equipment piece. Resolvable against /v2/items. */
  id: number
  /** In which slot the equipment piece is equiped. Possible values: */
  slot: string
  /** The skin id of the skin transmuted onto the equipment piece. Resolvable against /v2/skins. */
  skin?: number
  /** The item ids of the upgrade components sloted in the weapon. Resolvable against /v2/items. */
  upgrades?: number[]
  /** The item ids of the infusions sloted in the weapon. Resolvable against /v2/items. */
  infusions?: number[]
  /** The binding of the item. Possible values: */
  binding?: Binding
  /** The name of the character to which the item is bound. */
  bound_to?: string
  /** Either Equipped or Armory. */
  location: 'Equipped' | 'Armory'
  /** Four dye ids representing the dyes used in the dye slots of the equipment piece or null if a dye slot is unavailable for a piece. Resolvable against /v2/colors. */
  dyes?: number[]
  /** Contains detailed information on the weapon stats. */
  stats?: WeaponStats
}
interface ItemAttributes {
  /** Shows the amount of power given */
  Power?: number
  /** Shows the amount of Precision given */
  Precision?: number
  /** Shows the amount of Toughness given */
  Toughness?: number
  /** Shows the amount of Vitality given */
  Vitality?: number
  /** Shows the amount of Condition Damage given */
  Damage?: number
  /** Shows the amount of Condition Duration given */
  Duration?: number
  /** Shows the amount of Healing Power given */
  Healing?: number
  /** Shows the amount of Boon Duration given */
  BoonDuration?: number
}

interface EquipmentPvP {
  /** resolve id against v2/pvp/amulets. */
  amulet: number
  /** resolve id against v2/items. */
  rune: number
  /** resolve ids against v2/items. Will contain nulls for unequipped items. */
  sigils: number[]
}

interface ItemStats {
  /** The itemstat id, can be resolved against /v2/itemstats */
  id: number
  /** Contains a summary of the stats on the item. */
  attributes: ItemAttributes
}

interface WeaponStats {
  /** The id of the wepons stats. Resolvable against /v2/itemstats. */
  id: number
  /** Contains the weapon attributes in the form of key value pairs with the key being the attribute name and the value itself. */
  attributes: {[key in WeaponAttribute]?: number}
}

// INVENTORY (also EQUIPMENT?)
interface Item {
  /** The item id which can be resolved against /v2/items */
  id: number
  /** Amount of item in the stack. Minium of 1, maximum of 250. */
  count: number
  /** The number of charges on an item. */
  charges: number
  /** returns an array of infusion item ids which can be resolved against /v2/items */
  infusions: Array<any>
  /** returns an array of upgrade component item ids which can be resolved against /v2/items */
  upgrades: Array<any>
  /** Skin id for the given equipment piece. Can be resolved against /v2/skins */
  skin: number
  /** Contains information on the stats chosen if the item offers an option for stats/prefix. */
  stats: ItemStats
    /** Array of selected dyes for the equipment piece. Values default to null if no dye is selected. Colors can be resolved against v2/colors */
  dyes: number[]
  /** describes which kind of binding the item has. */
  binding: Binding
  /** Name of the character the item is bound to. */
  bound_to: string
}

interface Bag {
  /** The bag's item id which can be resolved against /v2/items */
  id: number
  /** The amount of slots available with this bag. */
  size: number
  /** Contains one object structure per item, object is null if no item is in the given bag slot. */
  inventory: Array<Item>
}

// SKILLS TRAITS TRAINING
interface SkillSet {
  /** contains the skill id for the heal skill, resolvable against /v2/skills. */
  heal: number
  /** each integer corresponds to a skill id for the equipped utilities, resolvable against /v2/skills. */
  utilities: number[]
  /** contains the skill id for the elite skill, resolvable against /v2/skills. */
  elite: number
  /** each string corresponds to a Revenant legend, resolvable against /v2/legends. */
  legends?: number[]
}

interface Traits {
  /** Specialization id, can be resolved against /v2/specializations. */
  id: number
  /** returns ids for each selected trait, can be resolved against /v2/traits. */
  traits: number[]
}

interface TrainingDetails {
  /** Skill tree id, can be compared against the training section for each /v2/professions. */
  id: number
  /** Shows how many hero points have been spent in this tree */
  spent: number
  /** States whether or not the tree is fully trained. */
  done: boolean
}

export namespace Schema_1970_01_01 {
  // CORE STUFF
  /** {@link https://wiki.guildwars2.com/wiki/API:2/characters/:id/core} */
  export interface Core {
    /** The character's name. */
    name: string
    /** The character's race. Possible values: */
    race: Race
    /** The character's gender. Possible values: */
    gender: Gender
    /** The character's profession. Possible values: */
    profession: Profession
    /** The character's level. */
    level: number
    /** The guild ID of the character's currently represented guild. */
    guild?: string
    /** The amount of seconds this character was played. */
    age: number
    /** An ISO-8601 standard timestamp of when the account information last changed as perceived by the API. This field is only present when a Schema version of 2019-02-21T00:00:00Z or later is requested. */
    last_modified: ISO8601
    /** ISO 8601 representation of the character's creation time. */
    created: ISO8601
    /** The amount of times this character has been defeated. */
    deaths: number
    /** The currently selected title for the character. References /v2/titles. */
    title?: number
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/characters/:id/crafting} */
  export interface Crafting {
    /** The name of the discipline. Possible values: */
    discipline: Discipline
    /** The current crafting level for the given discipline and character */
    rating: number
    /** Describes if the given discipline is currently active or not on the character. */
    active: boolean
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/characters/:id/buildtabs} */
  export interface BuildTabs {
    /** The "id" of this tab. (The position at which it resides.) */
    tab: number
    /** Whether or not this is the tab selected on the character currently. */
    is_active: boolean
    /** Contains detailed information about the build. */
    build: Build
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/characters/:id/buildtabs} */
  export interface Equipment {
    /** The item id, resolvable against /v2/items */
    id: number
    /** The equipment slot in which the item is slotted. This value is optional on schema 2019-12-19T00:00:00.000Z or later, will be missing if equipment is in an inactive tab. Possible values: */
    slot: EquipmentSlot
    /** returns an array of infusion item ids which can be resolved against /v2/items */
    infusions?: Array<number>
    /** returns an array of upgrade component item ids which can be resolved against /v2/items */
    upgrades?: Array<number>
    /** Skin id for the given equipment piece. Can be resolved against /v2/skins */
    skin?: number
    /** Contains information on the stats chosen if the item offers an option for stats/prefix. */
    stats: ItemStats
    /** describes which kind of binding the item has. Possible values: */
    binding?: Binding
    /** The amount of charges remaining on the item. */
    charges?: number
    /** Name of the character the item is bound to. */
    bound_to?: string
    /** Array of selected dyes for the equipment piece. Values default to null if no dye is selected. Colors can be resolved against v2/colors */
    dyes: number[]
  }

  // FIXME: Whats this?
  export interface Character {
    /** An array containing an entry for each crafting discipline the character has unlocked */
    crafting: Array<Crafting>
    /** An array containing an object for each equipment tab the character has. */
    equipment_tabs: Array<Build>
    /** An array containing an entry for each piece of equipment currently on the selected character. */
    equipment: Array<any>
  }




  export interface EquipmentTabs {
    /** The "id" of this tab. (The position at which it resides.) */
    tab: number
    /** The name given to the equipment combination. */
    name: string
    /** Whether or not this is the tab selected on the character currently. */
    is_active: boolean
    /** Contains an object for each equiped piece of equipment. */
    equipment: EquipmentTabDetails[]
    /** Contains the following key-value pairs: */
    equipment_pvp: EquipmentPvP
  }


  /** {@link https://wiki.guildwars2.com/wiki/API:2/characters/:id/inventory} */
  export interface Inventory {
    /** Contains one object structure per bag in the character's inventory */
    bags: Array<Bag>
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/characters/:id/recipes} */
  export interface Recipe {
    recipes: number[]
  }

  /** {@link https://wiki.guildwars2.com/API:2/characters/:id/skills} */
  export interface Skills {
    /** contains the pve, pvp, and wvw objects for the current utilities equipped. */
    skills: {
      /** contains the information on each slotted utility for PvE */
      pve: SkillSet
      /** contains the information on each slotted utility for PvP */
      pvp: SkillSet
      /** contains the information on each slotted utility for WvW */
      wvw: SkillSet
    }
  }

  /** {@link https://wiki.guildwars2.com/API:2/characters/:id/specializations} */
  export interface Specializations {
    /** contains the pve, pvp, and wvw objects for the current specializations and traits equipped. */
    specializations: {
      /** contains the information on each slotted specialization and trait for PvE */
      pve: Array<Traits>
      /** contains the information on each slotted specialization and trait for PvP */
      pvp: Array<Traits>
      /** contains the information on each slotted specialization and trait for WvW */
      wvw: Array<Traits>
    }
  }

  /** {@link https://wiki.guildwars2.com/API:2/characters/:id/training} */
  export interface Training {
    /** contains objects for each skill tree trained */
    training: Array<TrainingDetails>
  }
}

export namespace Schema_2019_12_19 {
  export interface Equipment extends Omit<Schema_1970_01_01.Equipment, 'slot'> {
    /** The unlock count of this item when location is LegendaryArmory. Available on schema 2019-12-19T00:00:00.000Z or later. */
    count: number
    /** The equipment slot in which the item is slotted. This value is optional on schema 2019-12-19T00:00:00.000Z or later, will be missing if equipment is in an inactive tab. Possible values: */
    slot?: EquipmentSlot
    /** describes where this item is stored. Available on schema 2019-12-19T00:00:00.000Z or later. Possible values:
     * 
     * - "Equipped": equipped in the active tab.
     * - "Armory": equipped in an inactive tabs.
     * - "EquippedFromLegendaryArmor": if the item is stored in the account-wide legendary armory, but equipped in the active tab.
     * - "LegendaryArmory": if the item is stored in the account-wide legendary armory, but equipped in an inactive tabs.
     */
    location: 'Equipped' | 'Armory' | 'EquippedFromLegendaryArmory' | 'LegendaryArmory'
    /** identifies which tabs this particular item is reused in. Available on schema 2019-12-19T00:00:00.000Z or later. */
    tabs: number[]
  }
}