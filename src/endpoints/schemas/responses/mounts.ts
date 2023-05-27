import { ColorMaterial, WeaponSlot } from "../../../types"

interface MountSkill { 
  id: number
  slot: WeaponSlot
}

interface DyeSlot {
  color_id: number
  material: ColorMaterial
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/mounts/types} */
  export interface Type {
    /** The id of the mount. */
    id: string
    /** The name of the mount type as it appears in-game. */
    name: string
    /** The mount skin a mount has when first obtained.  Can be resolved against v2/mounts/skins */
    default_skin: number
    /** An array of mount skin ids. Can be resolved against v2/mounts/skins */
    skins: Array<number>
    /** Each object contains a key-value pair for the skill id and weapon slot. */
    skills: MountSkill[]
  }

  /** {@link https://wiki.guildwars2.com/API:2/mounts/skins} */
  export interface Skin {
    /** The id of the mount skin. */
    id: string
    /** The name of the mount as it appears in-game. */
    name: string
    /** The full icon URL. */
    icon: string
    /** The mount type id for the given mount skin. Can be resolved against v2/mounts/types */
    mount: string
    /** Each object contains a key-value pair for the color (dye) id and material. Can be resolved against v2/colors */
    dye_slots: DyeSlot[]
  }
}