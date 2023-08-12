export namespace Schema_1970_01_01 {
  type Dim = [number, number]
  type Coordinate = [number, number]
  type Rectangle = [Dim, Dim]

  export interface Continent {
    id: number,
    name: 'Tyria' | 'Mists',
    continent_dims: Dim,
    min_zoom: number,
    max_zoom: number,
    floors: number[]
  }

  export interface Floor {
    texture_dims: Dim,
    clamped_view: Rectangle,
    regions: { [key: number]: Region }
  }

  export interface Region {
    name: string,
    label_coord: Coordinate,
    continent_rect: Rectangle,
    maps: { [key: number]: MapInfo }
  }

  export interface MapInfo {
    name: string,
    min_level: number,
    max_level: number,
    default_floor: number,
    label_coord: Coordinate,
    map_rect: Rectangle,
    continent_rect: Rectangle,
    points_of_interest: PointOfInterest[],
    tasks: Task[],
    skill_challenges: SkillChallenge[],
    sectors: Sector[],
    adventures: Adventure[],
    mastery_points: MasteryPoint[]
  }

  export interface Task {
    objective: string,
    level: number,
    coord: Coordinate,
    bounds: Coordinate[],
    id: number,
    chat_link: string
  }

  export interface SkillChallenge {
    coord: Coordinate,
    id: string
  }

  export interface Sector {
    name: string,
    level: number,
    coord: Coordinate,
    bounds: Coordinate[],
    chat_link: String,
    id: number
  }

  export interface Adventure {
    coord: Coordinate,
    id: string,
    name: string,
    description: string
  }

  export interface MasteryPoint {
    coord: Coordinate,
    id: number,
    region: Region,

  }

  export interface PoI<T extends 'landmark' | 'waypoint' | 'vista' | 'unlock'> {
    name: string,
    type: T,
    floor: number,
    coord: Dim,
    id: number,
    chat_link: string
  }

  export interface Landmark extends PoI<'landmark'> {}
  export interface Waypoint extends PoI<'waypoint'> {}
  export interface Vista extends PoI<'vista'> {}
  export interface Unlock extends PoI<'unlock'> { chat_link: string }
  export type PointOfInterest = Landmark | Waypoint | Vista | Unlock
}