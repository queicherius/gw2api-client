import { Race, Rarity, URL } from "../../../types"

type WeightClass = 'Clothing' | 'Light' | 'Medium' | 'Heavy'
type SkinType = 'Armor' | 'Weapon' | 'Back' | 'Gathering'
type Flag = 'ShowInWardRobe' | 'NoCost' |'HideIfLocked' | 'OverrideRarity'
type Material = 'cloth' | 'leather' | 'metal'
type Overrides = 'AsuraMale' | 'AsuraFemale' | 'CharrMale' | 'CharrFemale' | 'HumanMale' | 'HumanFemale' | 'NornMale' | 'NornFemale' | 'SylvariMale' | 'SylvariFemale'
type DyeSlot = {
  /** The id of the default color, to be resolved against v2/colors */
  color_id: number, 
  /** The type of material. Either cloth, leather, metal */
  material: Material
}

interface Armor {
  /** The armor type (slot). */
  type: string  // FIXME: typedef?
  /** The armor weight, either Clothing, Light, Medium or Heavy. */
  weight_class: WeightClass
  /** An object containing information on default slots and skin overrides. If the array item is null, this means dye cannot be applied to that slot, except if otherwise overriden by non-null values in the overrides array.  */
  dye_slots: {
    default: DyeSlot[],
    /** Object of race/gender overrides. Each sub-object follows the same structure as default. The possible override sub-objects are: AsuraMale, AsuraFemale, CharrMale, CharrFemale, HumanMale, HumanFemale, NornMale, NornFemale, SylvariMale, SylvariFemale */
    overrides: {[key in Overrides]?: DyeSlot[]}
  }
}

interface Weapon {
  /** The weapon type. */
  type: string  // FIXME: typedef?
  /** The damage type, either Physical, Fire, Lightning, Ice or Choking. */
  damage_type: 'Physical' | 'Fire' | 'Lightning' | 'Ice' | 'Choking'
}

/** The tool type, either Foraging, Logging or Mining */
type GatheringTool = 'Foraging' | 'Logging' | 'Mining'

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/account/skins} */
  export interface Skin {
    /** The skin id. */
    id: number
    /** The name of the skin. */
    name: string
    /** The skin type, either Armor, Weapon, Back or Gathering. */
    type: SkinType
    /** Additional skin flags. Possible flags are:
    * - ShowInWardrobe – When displayed in the account wardrobe (set for all skins listed in the API).
    * - NoCost – When applying the skin is free.
    * - HideIfLocked – When the skin is hidden until it is unlocked.
    * - OverrideRarity - When the skin overrides item rarity when applied
    */
    flags: Flag[]
    /** Race restrictions that apply to the skin, e.g. Human will be a listed restriction, if the skin can only be applied to human characters. */
    restrictions: Race[]
    /** The full icon URL. */
    icon: URL
    /** The rarity of the skin */
    rarity: Rarity
    /**  Optional skin description. */
    description: string
    /** Additional skin details if applicable, depending on the skin type  */
    details: Armor | Weapon | GatheringTool
  }

}
