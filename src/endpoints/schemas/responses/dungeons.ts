export namespace Schema_1970_01_01 {
    type Dungeons =  'ascalonian_catacombs' | 'caudecus_manor' | 'twilight_arbor' | 'sorrows_embrace' | 'citadel_of_flame' | 'honor_of_the_waves' | 'crucible_of_eternity' | 'ruined_city_of_arah'
    export interface Dungeon {
        id: Dungeons,
        paths: { 
            id: string, 
            type: 'Story' | 'Explorable' 
        }
    }
}