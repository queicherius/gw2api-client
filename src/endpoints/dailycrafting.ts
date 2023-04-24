import { AbstractEndpoint } from '../endpoint'

type DailyCrafting = 'lump_of_mithrilium' | 'spool_of_silk_weaving_thread' | 'spool_of_thick_elonian_cord'

export class DailycraftingEndpoint extends AbstractEndpoint<DailyCrafting[]> {
  constructor (client) {
    super(client)
    this.url = '/v2/dailycrafting'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
