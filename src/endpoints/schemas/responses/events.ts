type EventFlag = 'group_event' | 'map_wide' | 'meta_event' | 'dungeon_event'
type LocationType = 'sphere' | 'cylinder' | 'poly'
type Coordinate3D = [number, number, number]  // FIXME: reuse?
type Coordinate2D = [number, number]

interface BaseLocation<T extends LocationType> {
    type: T
    center: Coordinate3D
}

interface SphereLocation extends BaseLocation<'sphere'> {
  radius: number
  rotation: number
}

interface CylinderLocation extends BaseLocation<'cylinder'> {
  height: number
  radius: number
  rotation: number
}

interface PolyLocation extends BaseLocation<'poly'> {
  z_range: Coordinate2D
  points: Array<Coordinate2D>  
}

export namespace Schema_1970_01_01 {
  /** {@link https://wiki.guildwars2.com/API:1/event_details} */
  export interface EventDetails {
    /** The name of the event. */
    name: string
    /** The event level. */
    level: number
    /** The map where the event takes place. */
    map_id: number
    /** A list of additional flags. Possible flags are: */
    flags: Array<EventFlag>
    /** The location of the event. */
    location: SphereLocation | CylinderLocation | PolyLocation
    /** The type of the event location, can be sphere, cylinder or poly. */
    type: string
    /** The icon for the event. */
    icon?: object
    /** The file id to be used with the render service. */
    file_id: number
    /** The file signature to be used with the render service. */
    signature: string
  }
}