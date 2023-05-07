import { Schema as BaseSchema } from './schema_2019_05_22'
import * as legends from './responses/legends'

export interface Schema extends Omit<BaseSchema, 'Legends'> {
    Legends: legends.Schema_2019_12_19.Legend
}