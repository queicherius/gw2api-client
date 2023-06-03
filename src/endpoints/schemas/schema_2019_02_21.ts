import { Schema as BaseSchema } from './schema_1970_01_01'
import * as account from './responses/account'

export interface Schema extends Omit<BaseSchema, 'Account'> {
    Account: account.Schema_2019_02_21.Account
}