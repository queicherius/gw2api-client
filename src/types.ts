export type ItemID = number

export type URL = string
export type ISO8601 = string

export type Coordinate = [number, number]
export type Coordinate3 = [number, number, number]

export type Attribute = 'AgonyResistance' | 'BoonDuration' | 'ConditionDamage' | 'ConditionDuration' | 'CritDamage' | 'Healing' | 'Power' | 'Precision' | 'Toughness' | 'Vitality'
export type Language = 'en' | 'de' | 'es' | 'fr'
export type Gender = 'Male' | 'Female'
export type Race = 'Human' | 'Norn' | 'Charr' | 'Sylvari' | 'Asura'
export type Profession = 'Guardian' | 'Revenant' | 'Warrior' | 'Engineer' | 'Ranger' | 'Thief' | 'Elementalist' | 'Mesmer' | 'Necromancer'
export type Discipline = 'Armorsmith' | 'Artificer' | 'Chef' | 'Huntsman' | 'Jeweler' | 'Leatherworker' | 'Scribe' | 'Tailor' | 'Weaponsmith'
export type Region = 'Tyria' | 'Maguuma' | 'Desert' | 'Tundra'
export type Rarity = 'Junk' | 'Basic' | 'Fine' | 'Masterwork' | 'Rare' | 'Exotic' | 'Ascended' | 'Legendary'
export type Weapon = 'Axe' | 'Dagger' | 'Mace' | 'Pistol' | 'Sword' | 'Scepter' | 'Focus' | 'Shield' | 'Torch' | 'Warhorn' | 'Greatsword' | 'Hammer' | 'Longbow' | 'Rifle' | 'Shortbow' | 'Staff' | 'Speargun' | 'Spear' | 'Trident' | 'LargeBundle' | 'SmallBundle' | 'Toy' | 'ToyTwoHanded'
export type Attunement = 'Fire' | 'Water' | 'Wind' | 'Earth'
export type WeaponSlot = 'Weapon_1'
export type Trinket = 'Accessory' | 'Amulet' | 'Ring'
export type ArmorSlot = 'Coat' | 'Boots' | 'Gloves' | 'Helm' | 'Leggings' | 'Shoulders' | 'HelmAquatic'
export type EquipmentSlot =  ArmorSlot | 'Backpack' | 'Accessory1' | 'Accessory2' | 'Ring1' | 'Ring2' | 'Amulet' | 'WeaponAquaticA' | 'WeaponAquaticB' | 'WeaponA1' | 'WeaponA2' | 'WeaponB1' | 'WeaponB2' | 'Sickle' | 'Axe' | 'Pick'
export type ColorMaterial = 'cloth' | 'metal' | 'leather' | 'fur'
export type WeightClass = 'Heavy' | 'Medium' | 'Light' | 'Clothing'
export type DamageType = 'Fire' | 'Ice' | 'Lightning' | 'Physical' | 'Choking'