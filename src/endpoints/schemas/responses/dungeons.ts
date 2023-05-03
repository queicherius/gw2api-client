export namespace Schema_1970_01_01 {
    export interface Dungeon {
        id: string,
        paths: { 
            id: string, 
            type: 'Story' | 'Explorable' 
        }
    }
}