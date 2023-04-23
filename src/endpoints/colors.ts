import { AbstractEndpoint } from '../endpoint'

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

interface Color {
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

export class ColorsEndpoint extends AbstractEndpoint<Color> {
  constructor (client) {
    super(client)
    this.url = '/v2/colors'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
