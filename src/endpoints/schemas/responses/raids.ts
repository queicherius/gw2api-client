type EventType = 'Checkpoint' | 'Boss'

interface Event {
  /** The event/encounter name. */
  id: string
  /** The type of events.*/
  type: EventType
}

interface Wing {
  /** The given name for the dungeon path. */
  id: string
  events: Event[]
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:2/raids} */
  export interface Raid {
    /** The name of the dungeon. */
    id: string
    wings: Wing[]
  }
}