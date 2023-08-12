export namespace Schema_1970_01_01 {
  type RGB = [number, number, number]
  type Hue = 'Gray' | 'Brown' | 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple'
  type Material = 'Vibrant' | 'Leather' | 'Metal'
  type Rarity = 'Start' | 'Common' | 'Uncommon' | 'Rare' | 'Purple'
  type Category = Hue | Material | Rarity

  interface Details {
    brightness: number,
    contrast: number,
    hue: number,
    saturation: number,
    lightness: number,
    rgb: RGB
  }

  /** {@link https://wiki.guildwars2.com/wiki/API:2/colors} */
  export interface Color {
    id: number,
    name: string,
    base_rgb: RGB,
    cloth: Details,
    leather: Details,
    metal: Details,
    fur?: Details,
    item?: number
    categories: Category[]
  }
}