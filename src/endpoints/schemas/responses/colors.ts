export type RGB = [number, number, number]
export type Hue = 'Gray' | 'Brown' | 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple'
export type Material = 'Vibrant' | 'Leather' | 'Metal'
export type Rarity = 'Start' | 'Common' | 'Uncommon' | 'Rare' | 'Purple'
export type Category = Hue | Material | Rarity

export interface Details {
  brightness: number,
  contrast: number,
  hue: number,
  saturation: number,
  lightness: number,
  rgb: RGB
}

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