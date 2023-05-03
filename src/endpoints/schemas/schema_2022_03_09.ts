export * from './schema_2021_07_15'
import { Schema as BaseSchema } from './schema'
import * as cats from './responses/cats'

export interface Schema extends BaseSchema {
  Cats: cats.Schema_2019_03_22.Cat
  // TODO: add all the other exports
}