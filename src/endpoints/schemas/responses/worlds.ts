type Population = 'Low' | 'Medium' | 'High' | 'VeryHigh' | 'Full'

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/worlds} */
  export interface World {
    /** The world id.
     * 
     * The first digit of the id indicates the world's region. 1 is North America, 2 is Europe.
     * 
     * The second digit of the id currently correlates with the world's assigned language: 1 means French, 2 means German, and 3 means Spanish.
    */  
    id: number
    /** The world name. */
    name: string
    /** The world population level. One of: Low, Medium, High, VeryHigh, Full */
    population: string
  }
}