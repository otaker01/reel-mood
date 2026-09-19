import type { Filters, Movie, CastMember, TrailerSite } from "../types";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

const API_TOKEN =
  (import.meta.env.TMDB_API_KEY as string | undefined) ||
  (import.meta.env.VITE_TMDB_API_KEY as string | undefined) ||
  "";

export const GENRE_NAME_TO_ID: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Sci-Fi": 878,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export const GENRE_ID_TO_NAME: Record<number, string> = Object.fromEntries(
  Object.entries(GENRE_NAME_TO_ID).map(([name, id]) => [id, name]),
);

const MOOD_TO_GENRES: Record<string, number[]> = {
  happy: [35, 10751],
  lonely: [18],
  emotional: [18, 10749],
  relaxed: [99, 18],
  scared: [27, 53],
  angry: [28, 53],
  "mind-blown": [878, 9648],
  tired: [35, 16],
  romantic: [10749],
  funny: [35],
  "high-energy": [28, 12],
};

const MOOD_TAGS: Record<string, string[]> = {
  happy: ["Uplifting", "Warm", "Feel-good"],
  lonely: ["Intimate", "Quiet", "Reflective"],
  emotional: ["Emotional", "Heartfelt", "Powerful"],
  relaxed: ["Calm", "Atmospheric", "Easygoing"],
  scared: ["Tense", "Suspenseful", "Chilling"],
  angry: ["Intense", "Gritty", "High-stakes"],
  "mind-blown": ["Mind-bending", "Thought-provoking", "Surreal"],
  tired: ["Light", "Comfort", "Easy watch"],
  romantic: ["Romantic", "Tender", "Bittersweet"],
  funny: ["Funny", "Witty", "Entertaining"],
};

const SITUATION_TAGS: Record<string, string[]> = {
  alone: ["Perfect solo watch"],
  partner: ["Great for date night"],
  friends: ["Fun with friends"],
  family: ["Family-friendly pick"],
  background: ["Easy background watch"],
  movienight: ["Ideal movie-night pick"],
};

export const DISCOVER_SECTIONS: {
  id: string;
  label: string;
  icon: string;
  kind: "trending" | "discover";
  params?: Record<string, string>;
}[] = [
  { id: "trending", label: "Trending Now", icon: "🔥", kind: "trending" },
  { id: "gems", label: "Hidden Gems", icon: "💎", kind: "discover", params: { "vote_average.gte": "7.5", "vote_count.gte": "200", "vote_count.lte": "2500", sort_by: "vote_average.desc" } },
  { id: "cry", label: "Movies That Will Make You Cry", icon: "😭", kind: "discover", params: { with_genres: "18", "vote_average.gte": "7.2", sort_by: "popularity.desc" } },
  { id: "alone", label: "Perfect for Watching Alone", icon: "🌙", kind: "discover", params: { with_genres: "18,878", "vote_average.gte": "7", sort_by: "vote_average.desc" } },
  { id: "mindbend", label: "Mind-Bending Movies", icon: "🧠", kind: "discover", params: { with_genres: "878,9648", "vote_average.gte": "7", sort_by: "popularity.desc" } },
  { id: "feelgood", label: "Feel-Good Movies", icon: "✨", kind: "discover", params: { with_genres: "35,10751", "vote_average.gte": "7", sort_by: "popularity.desc" } },
  { id: "date", label: "Movies for Date Night", icon: "❤️", kind: "discover", params: { with_genres: "10749", "vote_average.gte": "7", sort_by: "popularity.desc" } },
  { id: "under2h", label: "Best Movies Under 2 Hours", icon: "⏱", kind: "discover", params: { "with_runtime.lte": "120", "vote_average.gte": "7.5", sort_by: "vote_average.desc" } },
  { id: "thinkdays", label: "Movies You'll Think About for Days", icon: "🌀", kind: "discover", params: { with_genres: "878,18,9648", "vote_average.gte": "7.5", sort_by: "vote_average.desc" } },
];

interface TmdbMovieListItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  vote_average: number;
  genre_ids?: number[];
  popularity?: number;
}

interface TmdbMovieDetail extends TmdbMovieListItem {
  runtime: number | null;
  genres?: { id: number; name: string }[];
  credits?: {
    cast: { name: string; character: string; profile_path: string | null; order: number }[];
    crew: { name: string; job: string }[];
  };
  release_dates?: {
    results: { iso_3166_1: string; release_dates: { certification: string }[] }[];
  };
  videos?: {
    results: { key: string; site: string; type: string; official: boolean }[];
  };
  reviews?: {
    results: { author: string; content: string; author_details: { rating: number | null; avatar_path: string | null } }[];
  };
  similar?: { results: TmdbMovieListItem[] };
}

interface TmdbPaged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

const movieCache = new Map<number, Movie>();

export function cacheMovies(movies: Movie[]) {
  for (const m of movies) movieCache.set(m.id, m);
}

export function getCachedMovie(id: number): Movie | undefined {
  return movieCache.get(id);
}

export function getCachedMovies(ids: Iterable<number>): Movie[] {
  const out: Movie[] = [];
  for (const id of ids) {
    const m = movieCache.get(id);
    if (m) out.push(m);
  }
  return out;
}

function assertToken() {
  if (!API_TOKEN) {
    throw new Error("Missing TMDB_API_KEY. Add it to your .env file.");
  }
}

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  assertToken();
  const url = new URL(`${BASE_URL}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== "" && v != null) url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`TMDB ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function posterUrl(path: string | null | undefined, size: "w342" | "w500" | "w780" = "w500") {
  if (!path) return "";
  return `${IMAGE_BASE}/${size}${path}`;
}

export function backdropUrl(path: string | null | undefined, size: "w780" | "w1280" | "original" = "w1280") {
  if (!path) return "";
  return `${IMAGE_BASE}/${size}${path}`;
}

export function profileUrl(path: string | null | undefined) {
  if (!path) return "";
  return `${IMAGE_BASE}/w185${path}`;
}

function formatDuration(mins: number | null | undefined): { duration: string; durationMins: number } {
  const m = mins ?? 0;
  if (!m) return { duration: "—", durationMins: 0 };
  const h = Math.floor(m / 60);
  const rem = m % 60;
  if (h === 0) return { duration: `${rem}m`, durationMins: m };
  if (rem === 0) return { duration: `${h}h`, durationMins: m };
  return { duration: `${h}h ${rem}m`, durationMins: m };
}

function yearFromDate(date?: string): number {
  if (!date) return 0;
  const y = parseInt(date.slice(0, 4), 10);
  return Number.isFinite(y) ? y : 0;
}

function eraFromYear(year: number): string {
  if (!year) return "";
  if (year < 1970) return "Classic";
  if (year < 1980) return "Classic";
  if (year < 1990) return "1980s";
  if (year < 2000) return "1990s";
  if (year < 2010) return "2000s";
  if (year < 2020) return "2010s";
  return "2020s";
}

function energyFromRuntimeAndGenres(runtime: number, genreIds: number[]): number {
  if (genreIds.some((id) => [28, 27, 53].includes(id))) return 4;
  if (genreIds.some((id) => [12, 878].includes(id))) return 3;
  if (runtime > 0 && runtime < 100) return 2;
  if (genreIds.some((id) => [18, 10749, 99].includes(id))) return 1;
  return 2;
}

function mapCertification(detail: TmdbMovieDetail): string {
  const us = detail.release_dates?.results?.find((r) => r.iso_3166_1 === "US");
  const cert = us?.release_dates?.find((r) => r.certification)?.certification;
  return cert || "NR";
}

function mapCast(detail: TmdbMovieDetail): CastMember[] {
  return (detail.credits?.cast ?? [])
    .slice(0, 8)
    .map((c) => ({
      name: c.name,
      character: c.character,
      photo: profileUrl(c.profile_path) || posterUrl(null),
    }));
}

function genresFromIds(ids: number[] = []): string[] {
  return ids.map((id) => GENRE_ID_TO_NAME[id] || "").filter(Boolean);
}

function buildMoodsAndTags(genreIds: number[], filters?: Filters) {
  const moods: string[] = [];
  const moodTags: string[] = [];

  for (const [mood, ids] of Object.entries(MOOD_TO_GENRES)) {
    if (ids.some((id) => genreIds.includes(id))) {
      moods.push(mood);
      moodTags.push(...(MOOD_TAGS[mood] ?? []));
    }
  }

  if (filters?.moods.length) {
    for (const m of filters.moods) {
      if (!moods.includes(m)) moods.push(m);
      moodTags.push(...(MOOD_TAGS[m] ?? []));
    }
  }

  return {
    moods: moods.slice(0, 4),
    moodTags: [...new Set(moodTags)].slice(0, 4),
  };
}

function buildMatchReasons(movie: Pick<Movie, "title" | "rating" | "genres" | "year" | "durationMins">, filters?: Filters): string[] {
  const reasons: string[] = [];
  if (filters?.moods.length) {
    reasons.push(`Matches your ${filters.moods.slice(0, 2).join(" & ")} mood`);
  }
  if (filters?.genres.length) {
    const hit = filters.genres.filter((g) => movie.genres.includes(g));
    if (hit.length) reasons.push(`Includes ${hit.join(", ")} as requested`);
  }
  if (filters?.situations.length) {
    for (const s of filters.situations.slice(0, 1)) {
      const tag = SITUATION_TAGS[s];
      if (tag) reasons.push(tag[0]);
    }
  }
  if (filters?.watchTime === "under90" && movie.durationMins > 0 && movie.durationMins < 90) {
    reasons.push("Fits under 90 minutes");
  } else if (filters?.watchTime === "under120" && movie.durationMins > 0 && movie.durationMins < 120) {
    reasons.push("Fits under 2 hours");
  } else if (filters?.watchTime === "over120" && movie.durationMins >= 120) {
    reasons.push("Epic runtime for a deep dive");
  }
  if (movie.rating >= 8) reasons.push("Critically acclaimed — highly rated");
  else if (movie.rating >= 7) reasons.push("Strong audience & critic scores");
  if (movie.year >= 2020) reasons.push("Fresh and contemporary");
  if (!reasons.length) reasons.push("Popular pick worth your time", "Strong storytelling and craft");
  return reasons.slice(0, 4);
}

function scoreMatch(movie: Movie, filters: Filters): number {
  const hasFilters =
    filters.moods.length > 0 ||
    filters.situations.length > 0 ||
    filters.genres.length > 0 ||
    filters.energyLevel > 0 ||
    filters.watchTime !== "" ||
    (filters.era !== "" && filters.era !== "any");

  if (!hasFilters) {
    return Math.min(99, Math.round(70 + movie.rating * 2.5));
  }

  let score = 0;
  let weight = 0;

  if (filters.moods.length > 0) {
    weight += 3;
    const overlap = filters.moods.filter((m) => movie.moods.includes(m)).length;
    score += (overlap / filters.moods.length) * 3;
  }
  if (filters.situations.length > 0) {
    weight += 1.5;
    score += 1.2;
  }
  if (filters.genres.length > 0) {
    weight += 2;
    const overlap = filters.genres.filter((g) => movie.genres.includes(g)).length;
    score += (overlap / filters.genres.length) * 2;
  }
  if (filters.energyLevel > 0) {
    weight += 2;
    const diff = Math.abs(movie.energyLevel - filters.energyLevel);
    score += diff === 0 ? 2 : diff === 1 ? 1.2 : diff === 2 ? 0.5 : 0;
  }
  if (filters.watchTime && filters.watchTime !== "any") {
    weight += 1;
    const passes =
      (filters.watchTime === "under90" && movie.durationMins > 0 && movie.durationMins < 90) ||
      (filters.watchTime === "under120" && movie.durationMins > 0 && movie.durationMins < 120) ||
      (filters.watchTime === "over120" && movie.durationMins >= 120);
    if (passes) score += 1;
  }
  if (filters.era && filters.era !== "any") {
    weight += 1;
    if (movie.era === filters.era) score += 1;
  }

  const ratingBoost = movie.rating / 20;
  const base = weight > 0 ? score / weight : 0.6;
  return Math.min(99, Math.round(52 + base * 42 + ratingBoost * 5));
}

export function mapListItemToMovie(item: TmdbMovieListItem, filters?: Filters): Movie {
  const year = yearFromDate(item.release_date);
  const genreIds = item.genre_ids ?? [];
  const genres = genresFromIds(genreIds);
  const { moods, moodTags } = buildMoodsAndTags(genreIds, filters);
  const { duration, durationMins } = formatDuration(0);

  const movie: Movie = {
    id: item.id,
    title: item.title,
    year,
    rating: Math.round(item.vote_average * 10) / 10,
    duration,
    durationMins,
    genres,
    poster: posterUrl(item.poster_path),
    backdrop: backdropUrl(item.backdrop_path) || posterUrl(item.poster_path, "w780"),
    description: item.overview || "No synopsis available.",
    director: "—",
    moods,
    situations: filters?.situations ?? [],
    energyLevel: energyFromRuntimeAndGenres(0, genreIds),
    moodTags: moodTags.length ? moodTags : ["Popular", "Recommended"],
    matchReasons: [],
    cast: [],
    ageRating: "NR",
    era: eraFromYear(year),
  };
  movie.matchReasons = buildMatchReasons(movie, filters);
  return movie;
}

export function mapDetailToMovie(detail: TmdbMovieDetail, filters?: Filters): Movie {
  const year = yearFromDate(detail.release_date);
  const genreIds = detail.genres?.map((g) => g.id) ?? detail.genre_ids ?? [];
  const genres =
    detail.genres?.map((g) => GENRE_ID_TO_NAME[g.id] || g.name.replace("Science Fiction", "Sci-Fi")) ??
    genresFromIds(genreIds);
  const { duration, durationMins } = formatDuration(detail.runtime);
  const director =
    detail.credits?.crew?.find((c) => c.job === "Director")?.name ?? "—";
  const { moods, moodTags } = buildMoodsAndTags(genreIds, filters);

  const movie: Movie = {
    id: detail.id,
    title: detail.title,
    year,
    rating: Math.round(detail.vote_average * 10) / 10,
    duration,
    durationMins,
    genres,
    poster: posterUrl(detail.poster_path),
    backdrop: backdropUrl(detail.backdrop_path) || posterUrl(detail.poster_path, "w780"),
    description: detail.overview || "No synopsis available.",
    director,
    moods,
    situations: filters?.situations ?? [],
    energyLevel: energyFromRuntimeAndGenres(durationMins, genreIds),
    moodTags: moodTags.length ? moodTags : ["Popular", "Recommended"],
    matchReasons: [],
    cast: mapCast(detail),
    ageRating: mapCertification(detail),
    era: eraFromYear(year),
  };
  movie.matchReasons = buildMatchReasons(movie, filters);

  const trailer = pickTrailer(detail.videos?.results);
  if (trailer) {
    movie.trailerKey = trailer.key;
    movie.trailerSite = trailer.site;
  }

  return movie;
}

function pickTrailer(
  videos?: { key: string; site: string; type: string; official: boolean }[],
): { key: string; site: TrailerSite } | null {
  if (!videos?.length) return null;

  const embeddable = videos.filter(
    (v) => (v.site === "YouTube" || v.site === "Vimeo") && v.key,
  );
  if (!embeddable.length) return null;

  const preferredTypes = ["Trailer", "Teaser", "Clip"];
  const preferredSites: TrailerSite[] = ["YouTube", "Vimeo"];

  for (const site of preferredSites) {
    for (const type of preferredTypes) {
      const official = embeddable.find((v) => v.site === site && v.type === type && v.official);
      if (official) return { key: official.key, site };
      const any = embeddable.find((v) => v.site === site && v.type === type);
      if (any) return { key: any.key, site };
    }
  }

  const fallback = embeddable[0];
  return { key: fallback.key, site: fallback.site as TrailerSite };
}

function filtersToDiscoverParams(filters: Filters): Record<string, string> {
  const params: Record<string, string> = {
    include_adult: "false",
    language: "en-US",
    sort_by: "popularity.desc",
    "vote_count.gte": "80",
  };

  const genreIds = new Set<number>();
  for (const g of filters.genres) {
    const id = GENRE_NAME_TO_ID[g];
    if (id) genreIds.add(id);
  }
  for (const mood of filters.moods) {
    for (const id of MOOD_TO_GENRES[mood] ?? []) genreIds.add(id);
  }
  if (genreIds.size) params.with_genres = [...genreIds].slice(0, 4).join(",");

  if (filters.watchTime === "under90") params["with_runtime.lte"] = "90";
  else if (filters.watchTime === "under120") params["with_runtime.lte"] = "120";
  else if (filters.watchTime === "over120") params["with_runtime.gte"] = "120";

  const eraRanges: Record<string, [string, string]> = {
    Classic: ["1900-01-01", "1979-12-31"],
    "1980s": ["1980-01-01", "1989-12-31"],
    "1990s": ["1990-01-01", "1999-12-31"],
    "2000s": ["2000-01-01", "2009-12-31"],
    "2010s": ["2010-01-01", "2019-12-31"],
    "2020s": ["2020-01-01", "2030-12-31"],
  };
  if (filters.era && filters.era !== "any" && eraRanges[filters.era]) {
    const [gte, lte] = eraRanges[filters.era];
    params["primary_release_date.gte"] = gte;
    params["primary_release_date.lte"] = lte;
  }

  if (filters.energyLevel >= 4) {
    params.with_genres = [28, 53, ...(params.with_genres ? params.with_genres.split(",").map(Number) : [])]
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 4)
      .join(",");
  } else if (filters.energyLevel === 1) {
    params["with_runtime.lte"] = params["with_runtime.lte"] || "130";
    params.sort_by = "vote_average.desc";
  }

  if (filters.situations.includes("family")) {
    genreIds.add(10751);
    params.with_genres = [...genreIds].slice(0, 4).join(",");
  }

  return params;
}

export async function fetchRecommendations(filters: Filters): Promise<(Movie & { match: number })[]> {
  const params = filtersToDiscoverParams(filters);
  const data = await tmdbFetch<TmdbPaged<TmdbMovieListItem>>("/discover/movie", {
    ...params,
    page: "1",
  });

  let movies = data.results
    .filter((m) => m.poster_path)
    .slice(0, 20)
    .map((m) => mapListItemToMovie(m, filters));

  // Enrich top results with detail (runtime, director) for better matching UI
  const top = await Promise.all(
    movies.slice(0, 8).map(async (m) => {
      try {
        return await fetchMovieDetail(m.id, filters);
      } catch {
        return m;
      }
    }),
  );
  movies = [...top, ...movies.slice(8)];
  cacheMovies(movies);

  const ranked = movies
    .map((m) => ({ ...m, match: scoreMatch(m, filters) }))
    .sort((a, b) => b.match - a.match);

  const winner = ranked[0];
  if (winner && !winner.trailerKey) {
    try {
      const detailed = await fetchMovieDetail(winner.id, filters);
      ranked[0] = { ...detailed, match: winner.match };
    } catch {
      /* keep the scored list movie if detail fetch fails */
    }
  }

  return ranked;
}

export async function fetchMovieDetail(id: number, filters?: Filters): Promise<Movie> {
  const detail = await tmdbFetch<TmdbMovieDetail>(`/movie/${id}`, {
    append_to_response: "credits,release_dates,videos,reviews,similar",
    language: "en-US",
  });
  const movie = mapDetailToMovie(detail, filters);
  cacheMovies([movie]);

  if (detail.similar?.results?.length) {
    const similar = detail.similar.results
      .filter((m) => m.poster_path)
      .slice(0, 10)
      .map((m) => mapListItemToMovie(m, filters));
    cacheMovies(similar);
    (movie as Movie & { similarIds?: number[] }).similarIds = similar.map((s) => s.id);
  }

  if (detail.reviews?.results?.length) {
    (movie as Movie & { reviews?: MovieReview[] }).reviews = detail.reviews.results.slice(0, 5).map((r) => ({
      user: r.author,
      rating: r.author_details.rating ? Math.round(r.author_details.rating / 2) : 4,
      text: r.content.replace(/\s+/g, " ").slice(0, 220) + (r.content.length > 220 ? "…" : ""),
      avatar: r.author_details.avatar_path
        ? r.author_details.avatar_path.startsWith("/http")
          ? r.author_details.avatar_path.slice(1)
          : profileUrl(r.author_details.avatar_path)
        : "",
    }));
  }

  return movie;
}

export interface MovieReview {
  user: string;
  rating: number;
  text: string;
  avatar: string;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (query.trim().length < 2) return [];
  const data = await tmdbFetch<TmdbPaged<TmdbMovieListItem>>("/search/movie", {
    query: query.trim(),
    include_adult: "false",
    language: "en-US",
    page: "1",
  });
  const movies = data.results.filter((m) => m.poster_path).slice(0, 12).map((m) => mapListItemToMovie(m));
  cacheMovies(movies);
  return movies;
}

export async function fetchTrending(): Promise<Movie[]> {
  const data = await tmdbFetch<TmdbPaged<TmdbMovieListItem>>("/trending/movie/week", {
    language: "en-US",
  });
  const movies = data.results.filter((m) => m.poster_path).slice(0, 12).map((m) => mapListItemToMovie(m));
  cacheMovies(movies);
  return movies;
}

export async function fetchDiscoverSection(
  section: (typeof DISCOVER_SECTIONS)[number],
): Promise<Movie[]> {
  if (section.kind === "trending") return fetchTrending();
  const data = await tmdbFetch<TmdbPaged<TmdbMovieListItem>>("/discover/movie", {
    include_adult: "false",
    language: "en-US",
    page: "1",
    "vote_count.gte": "100",
    ...(section.params ?? {}),
  });
  const movies = data.results.filter((m) => m.poster_path).slice(0, 12).map((m) => mapListItemToMovie(m));
  cacheMovies(movies);
  return movies;
}

export async function browseMovies(opts: {
  query?: string;
  genre?: string;
  sortBy?: string;
  duration?: string;
  page?: number;
}): Promise<Movie[]> {
  const { query = "", genre = "All", sortBy = "popular", duration = "", page = 1 } = opts;

  if (query.trim().length >= 2) {
    const results = await searchMovies(query);
    let filtered = results;
    if (genre !== "All") filtered = filtered.filter((m) => m.genres.includes(genre));
    return filtered;
  }

  const sortMap: Record<string, string> = {
    popular: "popularity.desc",
    rating: "vote_average.desc",
    newest: "primary_release_date.desc",
    oldest: "primary_release_date.asc",
  };

  const params: Record<string, string> = {
    include_adult: "false",
    language: "en-US",
    page: String(page),
    sort_by: sortMap[sortBy] || "popularity.desc",
    "vote_count.gte": sortBy === "rating" ? "300" : "50",
  };

  if (genre !== "All" && GENRE_NAME_TO_ID[genre]) {
    params.with_genres = String(GENRE_NAME_TO_ID[genre]);
  }
  if (duration === "short") params["with_runtime.lte"] = "90";
  else if (duration === "medium") {
    params["with_runtime.gte"] = "90";
    params["with_runtime.lte"] = "120";
  } else if (duration === "long") params["with_runtime.gte"] = "120";

  const data = await tmdbFetch<TmdbPaged<TmdbMovieListItem>>("/discover/movie", params);
  const movies = data.results.filter((m) => m.poster_path).map((m) => mapListItemToMovie(m));
  cacheMovies(movies);
  return movies;
}

export function getTrailerUrl(movie: Movie): string | null {
  const key = movie.trailerKey;
  if (!key) return null;
  if (movie.trailerSite === "Vimeo") return `https://vimeo.com/${key}`;
  return `https://www.youtube.com/watch?v=${key}`;
}

export function getTrailerEmbedUrl(movie: Movie): string | null {
  const key = movie.trailerKey;
  if (!key) return null;
  if (movie.trailerSite === "Vimeo") {
    return `https://player.vimeo.com/video/${key}?autoplay=1`;
  }
  return `https://www.youtube.com/embed/${key}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

export function getMovieReviews(movie: Movie): MovieReview[] {
  return (movie as Movie & { reviews?: MovieReview[] }).reviews ?? [];
}

export function getSimilarIds(movie: Movie): number[] {
  return (movie as Movie & { similarIds?: number[] }).similarIds ?? [];
}
