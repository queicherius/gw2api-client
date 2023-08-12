import { Schema as BaseSchema } from './schema_2019_05_21'
import * as tokeninfo from './responses/tokeninfo'

export interface Schema extends Omit<BaseSchema, 'Tokeninfo'> {
    Tokeninfo: tokeninfo.Schema_2022_05_19.TokenInfo
}
