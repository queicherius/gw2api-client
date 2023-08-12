import { Profession, URL } from '../../../types'

/**
 * - Bundle – Used for Engineer kits or weapons picked up in-world.
 * - Elite – Elite skill.
 * - Heal – Heal skill.
 * - Monster – Used for some NPC skills.
 * - Pet – Used for Ranger pet skills.
 * - Profession – Profession-specific skill, such as Elementalist attunements or Engineer toolbelt skills.
 * - Toolbelt – Used for some Engineer toolbelt skills.
 * - Transform – Placeholder skill used to indicate a locked slot.
 * - Utility – Utility skill.
 * - Weapon – Weapon skill or downed skill.
 */
type SkillType = 'Bundle' | 'Elite' | 'Heal' | 'Monster' | 'Pet' | 'Profession' | 'Toolbelt' | 'Utility' | 'Weapon'

/**
 * - Downed_[1-4] – Downed skills 1-4.
 * - Pet - Used for Ranger pet skills.
 * - Profession_[1-5] – Profession skills 1-5.
 * - Utility – Utility skill.
 * - Weapon_[1-5] – Weapon skills 1-5.
 */
type SkillSlot = 'Pet' | 'Utility' 
  | 'Downed_1' | 'Downed_2' | 'Downed_3' | 'Downed_4' 
  | 'Profession_1' | 'Profession_2' | 'Profession_3' | 'Profession_4' | 'Profession_5' 
  | 'Weapon_1' | 'Weapon_2' | 'Weapon_3' | 'Weapon_4' | 'Weapon_5'

type SkillCategory = 'DualWield' | 'StealthAttack' | 'Signet' | 'Cantrip'

type Attunment = 'Fire' | 'Water' | 'Air' | 'Earth'

type SkillFlags = 'GroundTargeted' | 'NoUnderwater'

type FactType = 'AttributeAdjust' | 'Buff' | 'ComboField' | 'ComboFinisher' | 'Damage' | 'Distance' | 'Duration' | 'Heal' | 'HealingAdjust' | 'NoData' | 'Number' | 'Percent' | 'PrefixedBuff' | 'Radius' | 'Range' | 'Recharge' | 'StunBreak' | 'Time' | 'Unblockable'

type ComboFieldType = 'Air' | 'Dark' | 'Fire' | 'Ice' | 'Light' | 'Lightning' | 'Poison' | 'Smoke' | 'Ethereal' | 'Water'

type ComboFinisherType = 'Blast' | 'Leap' | 'Projectile' | 'Whirl'

interface AttributeAdjustFact extends BaseFact<'AttributeAdjust'> {
  /** The amount target gets adjusted, based on a level 80 character at base stats. */
  value: number
  /**  The attribute this fact adjusts. Note that a value of Healing indicates the fact is a heal, and Ferocity is encoded at CritDamage. */
  target: string
}

interface BuffFact extends BaseFact<'Buff'> {
  /** The duration of the effect in seconds. Note that some facts of this type are just used to display the buff icon with text; in this case, duration is usually 0, or omitted entirely. */
  duration?: number
  /** The boon, condition, or effect referred to by the fact. */
  status: string // FIXME: type
  /** The description of the status effect. */
  description?: string
  /** The number of stacks applied. */
  apply_count?: number
}

interface ComboFieldFact extends BaseFact<'ComboField'> {
  /**  The type of field. */
  field_type: ComboFieldType
}

interface ComboFinisherFact extends BaseFact<'ComboFinisher'> {
  /** The percent chance that the finisher will trigger. */
  percent: number
  /** The type of finisher. */
  finisher_type: ComboFinisherType
}

interface DamageFact extends BaseFact<'Damage'> {
  /** The amount of times the damage hits. */
  hit_count: number
  /** Indicates the damage multiplier value of that skill. */
  dmg_multiplier: number
}

interface DistanceFact extends BaseFact<'Distance'> {
  /** The distance value. */
  distance: number
}

interface DurationFact extends BaseFact<'Duration'> {
  /** The duration in seconds. */
  duration: number
}

interface HealFact extends BaseFact<'Heal'> {
  /** The number of times the heal is applied. */
  hit_count: number
}

// FIXME: honestly, this feels very much like a copy-paste error in the wiki...
interface HealingAdjustFact extends BaseFact<'HealingAdjust'> {
  hit_count: number
}

interface NoDataFact extends BaseFact<'NoData'> {
}

interface NumberFact extends BaseFact<'Number'> {
  /** The number value as referenced by `text`. */
  value: number
}

interface PerecentFact extends BaseFact<'Percent'> {
  /** The percentage value as referenced by `text`. */
  percent: number
}

interface PrefixedBuffFact extends BaseFact<'PrefixedBuff'> {
  /** The duration of the effect in seconds. Note that some facts of this type are just used to display the buff icon with text; in this case, duration is usually 0, or omitted entirely. */
  duration?: number
  /** The boon, condition, or effect referred to by the fact. */
  status: string // FIXME: type
  /** The description of the status effect. */
  description?: string
  /** The number of stacks applied. */
  apply_count?: number
  prefix: {
    text: string,
    icon: URL,
    status: string,
    description: string
  }
}

interface RadiusFact extends BaseFact<'Radius'> {
  /** The radius value. */
  distance: number
}

interface RangeFact extends BaseFact<'Range'> {
  /** The range of the trait/skill. */
  value: number
}

interface RechargeFact extends BaseFact<'Recharge'> {
  /** The recharge time in seconds. */
  value: number 
}

interface StunBreakFact extends BaseFact<'StunBreak'> {
  value: true
}

interface TimeFact extends BaseFact<'Time'> {
  /** The time value in seconds. */
  duration: number
}

interface UnblockableFact extends BaseFact<'Unblockable'> {
  value: true
}

type Fact = AttributeAdjustFact | BuffFact | ComboFieldFact | ComboFinisherFact | DamageFact | DistanceFact | DurationFact | HealFact | HealingAdjustFact | NoDataFact | PerecentFact | PrefixedBuffFact | RadiusFact | RangeFact | RechargeFact | StunBreakFact | TimeFact | UnblockableFact

// we'll have to make an exception from the "always interfaces over types"-rule here to accomodate TraitedFacts that are actually just mixins of some additional properties
type TraitedFact = Fact & {
  /** Specifies which trait has to be selected in order for this fact to take effect. */
  requires_trait: number
  /** This specifies the array index of the facts object it will override, if the trait specified in requires_trait is selected. If this field is omitted, then the fact contained within this object is to be appended to the existing facts array. */
  overrides?: number
}

interface BaseFact<T extends FactType> {
  /** An arbitrary localized string describing the fact. */
  text: string
  /** A URL to the icon shown with the fact. Not included with all facts. */
  icon?: URL
  /** Defines what additional fields the object will contain, and what type of fact it is. Can be one of the following: */
  type: T
}


export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/skills} */
  export interface Skill {
    /** The skill id. */
    id: number
    /** The skill name. */
    name: string
    /** The skill description. */
    description?: string
    /** A URL to an icon of the skill. */
    icon: string
    /** The chat link. */
    chat_link: string
    /** The skill type (see below). Possible values: */
    type?: SkillType
    /** Indicates what weapon the skill is on. Can also be None if not applicable. */
    weapon_type?: string
    /** An array of strings indicating which profession(s) can use this skill. */
    professions: Array<Profession>
    /** A string indicating where this skill fits into. Possible values: */
    slot?: SkillSlot
    /** An array of skill fact objects describing the skill's effect. (See below.) */
    facts?: Array<Fact>
    /** An array of skill fact objects that may apply to the skill, dependent on the player's trait choices. */
    traited_facts?: Array<Fact>
    /** An array of categories the skill falls under. Mostly used for organizational purposes, with some exceptions: */
    categories?: Array<SkillCategory>
    /** Used for Elementalist weapon skills, indicates what attunement this skill falls under. One of: Fire, Water, Air, Earth. */
    attunement?: Attunment
    /** Used for Revenant, Warrior, and Druid skills to indicate their energy cost. */
    cost?: number
    /** Indicates what off-hand must be equipped for this dual-wield skill to appear. */
    dual_wield?: string
    /** Used for skills that "flip over" into a new skill in the same slot to indicate what skill they flip to, such as Engineer toolkits or Herald facets. */
    flip_skill?: number
    /** Indicates the Initiative cost for thief skills. */
    initiative?: number
    /** Indicates the next skill in the chain, if applicable. */
    next_chain?: number
    /** Indicates the previous skill in the chain, if applicable. */
    prev_chain?: number
    /** Used to indicate that the skill will transform the player, replacing their skills with the skills listed in the array. */
    transform_skills?: Array<Skill>
    /** Used to indicate that the skill will replace the player's skills with the skills listed in the array. */
    bundle_skills?: Array<Skill>
    /** Used for Engineer utility skills to indicate their associated toolbelt skill. */
    toolbelt_skill?: number
    /** Used to indicate usage limitations, more than one value can be set. One of: GroundTargeted, NoUnderwater. */
    flags?: Array<SkillFlags>
  }
}