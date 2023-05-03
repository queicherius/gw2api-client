export namespace Schema_1970_01_01 {
    /** {@link https://wiki.guildwars2.com/wiki/API:2/currencies} */
    export interface Currency {
        /** The currency's ID. **/
        id: number
        /** The currency's name. **/
        name: string
        /** A description of the currency. */
        description: string
        /** A URL to an icon for the currency. */
        icon: string
        /** A number that can be used to sort the list of currencies when ordered from least to greatest. */
        order: number
    }
}
