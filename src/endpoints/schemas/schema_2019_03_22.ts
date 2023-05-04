import { Schema as BaseSchema } from './schema_2019_02_21'
import * as cats from './responses/cats'

export interface Schema extends Omit<BaseSchema, 'Cats'> {
  Cats: cats.Schema_2019_03_22.Cat
}