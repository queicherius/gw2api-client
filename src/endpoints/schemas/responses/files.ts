import { URL } from "../../../types"

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/wiki/API:2/files} */
  export interface File {
    /** The file identifier. */
    id: string
    /** The URL to the image. */
    icon: URL
  }
}
