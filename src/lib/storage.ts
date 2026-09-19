import type { Movie } from "../types";

const SAVED_KEY = "reelmood:watchlist";

export function loadSavedMovies(): Movie[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isMovie);
  } catch {
    return [];
  }
}

export function persistSavedMovies(movies: Movie[]) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(movies));
  } catch {
    /* private mode / quota */
  }
}

function isMovie(value: unknown): value is Movie {
  if (!value || typeof value !== "object") return false;
  const movie = value as Partial<Movie>;
  return typeof movie.id === "number" && typeof movie.title === "string";
}
