import primaryFull from "../assets/tmdb/primary-full.svg";
import primaryShort from "../assets/tmdb/primary-short.svg";
import primaryLong from "../assets/tmdb/primary-long.svg";
import altLong from "../assets/tmdb/alt-long.svg";
import altShort from "../assets/tmdb/alt-short.svg";

export const TMDB_SITE = "https://www.themoviedb.org";
export const TMDB_API_TERMS = "https://www.themoviedb.org/api-terms-of-use";
export const TMDB_TERMS = "https://www.themoviedb.org/terms-of-use";
export const TMDB_LOGOS_PAGE = "https://www.themoviedb.org/about/logos-attribution";
export const TMDB_FAQ = "https://developer.themoviedb.org/docs/faq";

/** Required notice from the TMDB API Terms of Use, paragraph 3 (Attribution). */
export const TMDB_NOTICE =
  "This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.";

/** Attribution wording from the TMDB developer FAQ. */
export const TMDB_FAQ_NOTICE =
  "This product uses the TMDB API but is not endorsed or certified by TMDB.";

export const TMDB_LOGO_SHORT = primaryShort;

export const TMDB_LOGOS = [
  { id: "primary-full", label: "Primary full (blue)", src: primaryFull, className: "h-14 w-auto" },
  { id: "primary-short", label: "Primary short (blue)", src: primaryShort, className: "h-6 w-auto" },
  { id: "primary-long", label: "Primary long (blue)", src: primaryLong, className: "h-5 w-auto max-w-full" },
  { id: "alt-long", label: "Alt long (blue)", src: altLong, className: "h-5 w-auto max-w-full" },
  { id: "alt-short", label: "Alt short (blue)", src: altShort, className: "h-16 w-auto" },
] as const;
