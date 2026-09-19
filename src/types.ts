export type Page =
  | "home"
  | "recommendations"
  | "discover"
  | "browse"
  | "movie-detail"
  | "categories"
  | "saved";

export interface CastMember {
  name: string;
  character: string;
  photo: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  duration: string;
  durationMins: number;
  genres: string[];
  poster: string;
  backdrop: string;
  description: string;
  director: string;
  moods: string[];
  situations: string[];
  energyLevel: number;
  moodTags: string[];
  matchReasons: string[];
  streamingOn: string[];
  cast: CastMember[];
  ageRating: string;
  era: string;
  match?: number;
}

export interface Filters {
  moods: string[];
  situations: string[];
  genres: string[];
  energyLevel: number;
  watchTime: string;
  era: string;
}

export const defaultFilters: Filters = {
  moods: [],
  situations: [],
  genres: [],
  energyLevel: 0,
  watchTime: "",
  era: "",
};
