import { BaseCategory, Flag, LevelTuple, RequiredAccess } from "./responses/achievements"

export * from './schema_2022_03_09'

export namespace Schema_2022_03_23 {
    /** {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories} */
    export interface Category extends BaseCategory {
        achievements: [
            id: number,
            name: string,
            description: string,
            order: number,
            icon: string,
            achievements: { 
                id: number,
                required_access: RequiredAccess
                flags: Flag[],
                level: [number, number]
            },
            tomorrow: {
                id: number,
                required_access: RequiredAccess,
                flags: Flag[],
                level: LevelTuple
            }
        ]
    }
}
