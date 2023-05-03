export namespace Schema_1970_01_01 {
    /** {@link https://wiki.guildwars2.com/wiki/API:2/gliders} */
    export interface Glider {
        /** The id of the glider */
        id: number,
        /** An array of item ids used to unlock the glider. Can be resolved against v2/items */
        unlock_items?: number[],
        /** The order in which the glider appears in a list. This value is not unique. */
        order: number,
        /** The icon uri for the glider. */
        icon: string,
        /** The name of the glider as it appears in-game. */
        name: string,
        /** The in-game glider description. */
        description: string,
        /** List of dye ids. Can be resolved against v2/colors. */
        default_dies: number[]
    }
}
