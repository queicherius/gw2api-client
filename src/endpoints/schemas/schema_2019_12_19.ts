import { Schema as BaseSchema } from './schema_2019_05_22'
import * as legends from './responses/legends'
import * as professions from './responses/professions'

export interface Schema extends Omit<BaseSchema, 'Legends' | 'Professions'> {
    Legends: legends.Schema_2019_12_19.Legend
    Professions: professions.Schema_2019_12_19.Profession
}