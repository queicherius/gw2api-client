import { Profession } from "../../../types"
import { Attunement, Weapon } from "../../../types"

type WeaponFlag = 'Mainhand' | 'Offhand' | 'TwoHand' | 'Aquatic'
type SkillSlot = 'Profession_1' | 'Utility' | 'Heal' | 'Elite'
type ProfessionFlag = 'NotRacialSkills' | 'NoWeaponSwap'
type TrainingCategory = 'Skills' | 'Specializations' | 'EliteSpecializations'

interface Track {
  /** The cost to train this skill or trait. */
  cost: number
}

interface Trait extends Track {
  type: 'Trait'
  /** This field is only present if type is Trait. */
  trait_id: number
}

interface Skill extends Track {
  type: 'Skill'
  /** This field is only present if type is Skill. */
  skill_id: number
}

interface Training {
  /** The id of the API:2/skills or API:2/specializations inidcated by the category. */
  id: number
  /** The category for the training object. */
  category: TrainingCategory
  /** The name of the skill or specialization inidcated by the category and id. */
  name: string
  /** List of skills and traits training details tracks objects.  */
  track: Array<Trait | Skill>
}

interface WeaponSkill {
  /** The id of the API:2/skills. */
  id: number
  /** The skill bar slot that this weapon skill can be used in. */
  slot: SkillSlot
  /** The name of the offhand weapon this skill requires to be equipped. This field is usually only present for Thief skills. */
  offhand?: Weapon
  /** The Elementalist attunement that this skill requires. This field is usually only present for Elementalist skills. */
  attunement?: Attunement
  /**  The name of the class the skill was stolen from. This only applies to thief stolen skills. */
  source?: Profession
}

interface WeaponInfo {
  flag: WeaponFlag[]
  /** he API:2/specializations id of the required specialization to use this weapon. This field is only present if the weapon requires a specialization to be used. */
  specialization?: number
  /** The list of weapon skills objects.  */
  skills: WeaponSkill[]
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/professions} */
  export interface Profession {
    /** The profession id. */
    id: string
    /** The name of the profession. */
    name: string
    /** The icon for the profession. */
    icon: string
    /** The large icon for the profession. */
    icon_big: string
    /** List of API:2/specializations ids. */
    specializations: number[]
    /** List of training details objects. */
    training: Training[]
    /** The weapons available for this profession. The key indicates the weapon type. */
    weapons: {[key in Weapon]?: WeaponInfo}
    flags: ProfessionFlag[]
  }
}

export namespace Schema_2019_12_19 {
  export interface Profession extends Schema_1970_01_01.Profession {
    /** The profession code for a build template link. Available on schema version 2019-12-19T00:00:00.000Z or later. */
    code: number
    /** Contains arrays of two numbers. The first number is a skill palette ID obtained from a build template link, the second number is a skill ID. This is so you can resolve palette IDs obtained from a build template link to API:2/skills. This is only available on schema version 2019-12-19T00:00:00.000Z */
    skills_by_palette: Array<[number, number]>
  }
}