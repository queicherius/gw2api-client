type FactTypeName = 'AttributeAdjust' | 'Buff' | 'BuffConversion' | 'ComboField' | 'ComboFinisher' | 'Damage' | 'Distance' | 'NoData' | 'Number' | 'Percent' | 'PrefixedBuff' | 'Radius' | 'Range' | 'Recharge' | 'Time' | 'Unblockable'
type FactType = AttributeAdjust | Buff | BuffConversion | ComboField | ComboFinisher | Damage | Distance | NoData | Number | Percent | PrefixedBuff | Radius | Range | Recharge | Time | Unblockable
type TraitType = 'Major' | 'Minor'

interface Skill {
  /** The ID of the skill. */
  id: number
  /** The name of the skill. */
  name: string
  /** The description of the skill. */
  description: string
  /** The URL for the icon of the skill. */
  icon: string
  /** A list of tooltip facts associated with the skill. (See below.) */
  facts?: Array<any>
  /** A list of additions or changes to tooltip facts where there is interplay between traits. (See below.) */
  traited_facts?: Array<any>
}

interface TraitedFact {
  /** Specifies which trait has to be selected in order for this fact to take effect. */
  requires_trait: number
  /** This specifies the array index of the facts object it will override, if the trait specified in requires_trait is selected. If this field is omitted, then the fact contained within this object is to be appended to the existing facts array. */
  overrides?: number
}

interface Fact<T extends FactTypeName> {
  /** An arbitrary localized string describing the fact. Not included with all facts. */
  text?: string
  /** A URL to the icon shown with the fact. Not included with all facts. */
  icon?: string
  /** Defines what additional fields the object will contain, and what type of fact it is. Can be one of the following: */
  type: T
}

interface AttributeAdjust extends Fact<'AttributeAdjust'> {
  /** The amount target gets adjusted, based on a level 80 character at base stats. */
  value: number
  /**  The attribute this fact adjusts. Note that a value of Healing indicates the fact is a heal, and Ferocity is encoded at CritDamage. */
  target: string
}

interface Buff extends Fact<'Buff'> {
  /** The boon, condition, or effect referred to by the fact. */
  status: string
  /** The description of the status effect. */
  description?: string
  /** The number of stacks applied. */
  apply_count?: number
  /** The duration of the effect in seconds. Note that some facts of this type are just used to display the buff icon with text; in this case, duration is usually 0, or omitted entirely. */
  duration?: number
}

interface BuffConversion extends Fact<'BuffConversion'> {
  /** The attribute that is used to calculate the attribute gain. */
  source: string
  /** How much of the source attribute is added to target. */
  percent: string
  /** The attribute that gets added to. */
  target: string
}

interface ComboField extends Fact<'ComboField'> {
  /** The type of field. */
  field_type: 'Air' | 'Dark' | 'Fire' | 'Ice' | 'Light' | 'Lightning' | 'Poison' | 'Smoke' | 'Ethereal' | 'Water'
}

interface ComboFinisher extends Fact<'ComboFinisher'> {
  /** The type of finisher.  */
  finisher_type: 'Blast' | 'Leap' | 'Projectile' | 'Whirl'
  /** The percent chance that the finisher will trigger. */
  percent: number
}

interface Damage extends Fact<'Damage'> {
  /** The amount of times the damage hits. */
  hit_count: number
}

interface Distance extends Fact<'Distance'> {
  /** The distance value. */
  distance: number
}

interface NoData extends Fact<'NoData'> {
}

interface Number extends Fact<'Number'> {
  /** The number value as referenced by text. */
  value: number
}

interface Percent extends Fact<'Percent'> {
  /** The percentage value as referenced by text. */
  value: number
}

interface PrefixedBuff extends Fact<'Percent'> {
  /** The boon, condition, or effect referred to by the fact. */
  status: string
  /** The description of the status effect. */
  description?: string
  /** The number of stacks applied. */
  apply_count?: number
  /** The duration of the effect in seconds. Note that some facts of this type are just used to display the buff icon with text; in this case, duration is usually 0, or omitted entirely. */
  duration?: number
  prefix: {
    text: string
    icon: string
    status: string
    description?: string
  }
}

interface Radius extends Fact<'Radius'> {
  /** The radius value. */
  distance: number
}

interface Range extends Fact<'Range'> {
  /** The range of the trait/skill. */
  value: number
}

interface Recharge extends Fact<'Recharge'> {
  /** The recharge time in seconds. */
  recharge: number
}

interface Time extends Fact<'Time'> {
  /** The time value in seconds. */
  duration: number
}

interface Unblockable extends Fact<'Unblockable'> {
  /** Always true. */
  value: true
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/traits} */
  export interface Trait {
    /** The trait id. */
    id: number
    /** The trait name. */
    name: string
    /** The trait's icon URL. */
    icon: string
    /** The trait description. */
    description: string
    /** The id of the specialization this trait belongs to. */
    specialization: number
    /** The trait's tier (Adept, Master, Grandmaster) as a value from 1-3. Elite specializations also contain a tier 0 minor trait, describing which weapon the elite specialization gains access to. */
    tier: number
    /** Either Major or Minor depending on the trait's slot. Minor traits are the ones given immediately when choosing a specialization. */
    slot: TraitType
    /** A list of tooltip facts associated with the trait itself. (See below.) */
    facts?: Array<FactType>
    /** A list of additions or changes to tooltip facts where there is interplay between traits. (See below.) */
    traited_facts?: Array<TraitedFact>
    /** A list of skills which may be triggered by the trait. (See below.) */
    skills?: Array<Skill>
  }
}








