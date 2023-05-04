export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/emblem} */
  interface Layer {
    /** The ID of the emblem part. */
    id: number,
    /** An array of URLs to images that make up the various parts of the emblem. */
    layers: string[]
  }

  export type Emblem = Layer[]
}
