import type { Filters, Page } from "../types";
import { defaultFilters } from "../types";

export interface Route {
  page: Page;
  movieId: number | null;
  filters: Filters;
}

const PAGE_PATHS: Record<Exclude<Page, "movie-detail">, string> = {
  home: "/",
  discover: "/discover",
  browse: "/browse",
  saved: "/saved",
  recommendations: "/recommendations",
  policies: "/policies",
};

function basePathname(): string {
  const base = import.meta.env.BASE_URL || "/";
  try {
    return new URL(base, window.location.origin).pathname.replace(/\/$/, "");
  } catch {
    return base.replace(/\/$/, "");
  }
}

export function appPathname(pathname = window.location.pathname): string {
  const base = basePathname();
  let path = pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;
  return path;
}

export function hrefFor(page: Page, movieId?: number | null, filters?: Filters): string {
  const base = import.meta.env.BASE_URL || "/";
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const baseUrl = new URL(base, origin);
  let rel = "";
  if (page === "movie-detail" && movieId != null) {
    rel = `movie/${movieId}`;
  } else if (page !== "movie-detail") {
    rel = PAGE_PATHS[page].replace(/^\//, "");
  }
  const url = rel ? new URL(rel, baseUrl) : baseUrl;
  const search = page === "recommendations" && filters ? filtersToSearch(filters) : "";
  return url.pathname + search;
}

export function filtersToSearch(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.moods.length) params.set("moods", filters.moods.join(","));
  if (filters.situations.length) params.set("situations", filters.situations.join(","));
  if (filters.genres.length) params.set("genres", filters.genres.join(","));
  if (filters.energyLevel) params.set("energy", String(filters.energyLevel));
  if (filters.watchTime) params.set("watchTime", filters.watchTime);
  if (filters.era) params.set("era", filters.era);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function filtersFromSearch(search: string): Filters {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const csv = (key: string) =>
    (params.get(key) || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  const energy = Number(params.get("energy") || 0);
  return {
    moods: csv("moods"),
    situations: csv("situations"),
    genres: csv("genres"),
    energyLevel: Number.isFinite(energy) ? energy : 0,
    watchTime: params.get("watchTime") || "",
    era: params.get("era") || "",
  };
}

export function parseLocation(pathname?: string, search?: string): Route {
  const path = appPathname(pathname);
  const query = search ?? (typeof window !== "undefined" ? window.location.search : "");
  const movieMatch = path.match(/^\/movie\/(\d+)\/?$/);
  if (movieMatch) {
    return { page: "movie-detail", movieId: Number(movieMatch[1]), filters: defaultFilters };
  }

  const normalized = path.replace(/\/+$/, "") || "/";
  const entry = Object.entries(PAGE_PATHS).find(([, value]) => value === normalized);
  if (entry) {
    const page = entry[0] as Exclude<Page, "movie-detail">;
    return {
      page,
      movieId: null,
      filters: page === "recommendations" ? filtersFromSearch(query) : defaultFilters,
    };
  }

  return { page: "home", movieId: null, filters: defaultFilters };
}

export function isModifiedClick(event: { button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean }): boolean {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}
