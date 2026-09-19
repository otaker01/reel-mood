import { useState, useEffect } from "react";
import type { Movie, Filters } from "../types";
import { fetchMovieDetail, getTrailerEmbedUrl } from "../lib/tmdb";
import MovieCard from "../components/MovieCard";
import TrailerLightbox from "../components/TrailerLightbox";

interface RecommendationsProps {
  filters: Filters;
  setFilters: (f: Filters) => void;
  movies: (Movie & { match: number })[];
  savedMovies: Set<number>;
  onToggleSave: (id: number) => void;
  onMovieClick: (id: number) => void;
  onAdjustFilters: () => void;
  loading?: boolean;
}

function getActiveChips(filters: Filters): { label: string; key: string; value: string }[] {
  const chips: { label: string; key: string; value: string }[] = [];
  filters.moods.forEach((m) => chips.push({ label: m.charAt(0).toUpperCase() + m.slice(1), key: "moods", value: m }));
  filters.situations.forEach((s) => chips.push({ label: s === "alone" ? "Watching Alone" : s === "partner" ? "With Partner" : s === "friends" ? "With Friends" : s, key: "situations", value: s }));
  filters.genres.forEach((g) => chips.push({ label: g, key: "genres", value: g }));
  if (filters.watchTime) chips.push({ label: filters.watchTime === "under90" ? "Under 90 min" : filters.watchTime === "under120" ? "Under 2 hours" : filters.watchTime === "over120" ? "2+ hours" : "Any length", key: "watchTime", value: filters.watchTime });
  if (filters.era && filters.era !== "any") chips.push({ label: filters.era, key: "era", value: filters.era });
  return chips;
}

export default function Recommendations({
  filters, setFilters, movies, savedMovies, onToggleSave, onMovieClick, onAdjustFilters, loading = false,
}: RecommendationsProps) {
  const [topSaved, setTopSaved] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerSrc, setTrailerSrc] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const chips = getActiveChips(filters);
  const topMovie = movies[0];
  const moreMovies = movies.slice(1);

  useEffect(() => {
    setShowTrailer(false);
    setTrailerSrc(null);
  }, [topMovie?.id]);

  const removeChip = (chip: { key: string; value: string }) => {
    if (chip.key === "moods") setFilters({ ...filters, moods: filters.moods.filter((m) => m !== chip.value) });
    else if (chip.key === "situations") setFilters({ ...filters, situations: filters.situations.filter((s) => s !== chip.value) });
    else if (chip.key === "genres") setFilters({ ...filters, genres: filters.genres.filter((g) => g !== chip.value) });
    else if (chip.key === "watchTime") setFilters({ ...filters, watchTime: "" });
    else if (chip.key === "era") setFilters({ ...filters, era: "" });
  };

  const matchColor = (pct: number) =>
    pct >= 90 ? "text-green-400" : pct >= 75 ? "text-yellow-400" : "text-smoke";

  const openTrailer = async () => {
    if (!topMovie) return;
    const existing = getTrailerEmbedUrl(topMovie);
    if (existing) {
      setTrailerSrc(existing);
      setShowTrailer(true);
      return;
    }
    setTrailerLoading(true);
    try {
      const detailed = await fetchMovieDetail(topMovie.id, filters);
      const embed = getTrailerEmbedUrl(detailed);
      if (embed) {
        setTrailerSrc(embed);
        setShowTrailer(true);
      }
    } catch {
      /* keep the page usable if the trailer cannot load */
    } finally {
      setTrailerLoading(false);
    }
  };

  if (!topMovie) {
    if (loading) {
      return (
        <div className="min-h-screen pt-28 px-6">
          <div className="max-w-6xl mx-auto h-[50vh] rounded-3xl bg-card animate-pulse" />
        </div>
      );
    }
    return (
      <div className="min-h-screen pt-28 px-6 text-center">
        <h1 className="font-display text-3xl text-white mb-3">No matches yet</h1>
        <p className="text-smoke text-sm mb-6">Try adjusting your mood or filters and search again.</p>
        <button
          onClick={onAdjustFilters}
          className="px-5 py-2.5 bg-flame rounded-xl text-white text-sm font-semibold"
        >
          Adjust Filters
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 max-w-6xl mx-auto px-4 sm:px-6 pb-24 min-w-0 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">Your perfect matches</h1>
          {chips.length > 0 && (
            <p className="text-smoke text-sm mt-1">
              Based on{" "}
              {chips
                .slice(0, 4)
                .map((c) => c.label.toLowerCase())
                .join(", ")}
              {chips.length > 4 && ` and ${chips.length - 4} more`}
            </p>
          )}
        </div>
        <button
          onClick={onAdjustFilters}
          className="shrink-0 px-4 py-2 rounded-xl bg-card border border-rim text-sm text-smoke hover:text-white hover:border-white/30 transition-colors"
        >
          ⚙ Adjust Filters
        </button>
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {chips.map((chip, i) => (
            <button
              key={i}
              onClick={() => removeChip(chip)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-flame/10 border border-flame/30 text-flame text-sm font-medium hover:bg-flame/20 transition-colors"
            >
              {chip.label}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
          <button
            onClick={() => setFilters({ moods: [], situations: [], genres: [], energyLevel: 0, watchTime: "", era: "" })}
            className="px-3 py-1.5 rounded-full text-smoke/60 text-sm hover:text-smoke transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Top Match ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-6 bg-flame rounded-full" />
          <h2 className="text-white font-semibold text-lg">Top Match</h2>
        </div>

        <div className="bg-card rounded-3xl overflow-hidden border border-rim hover:border-flame/20 transition-colors">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Poster */}
            <div
              className="relative md:w-56 h-64 md:h-auto shrink-0 cursor-pointer"
              onClick={() => onMovieClick(topMovie.id)}
            >
              <img
                src={topMovie.poster}
                alt={topMovie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30 hidden md:block" />
            </div>

            {/* Info */}
            <div className="flex-1 p-5 sm:p-6 md:p-8 min-w-0">
              {/* Match badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-3xl font-bold font-display ${matchColor(topMovie.match)}`}>
                  {topMovie.match}%
                </span>
                <span className="text-smoke text-sm">Perfect Match</span>
              </div>

              <h3
                className="font-display text-2xl sm:text-3xl font-semibold text-white mb-2 cursor-pointer hover:text-flame transition-colors break-words"
                onClick={() => onMovieClick(topMovie.id)}
              >
                {topMovie.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-smoke text-sm mb-4">
                <span>{topMovie.year}</span>
                <span className="text-rim">•</span>
                <span>{topMovie.genres.join(", ")}</span>
                <span className="text-rim">•</span>
                <span>{topMovie.duration}</span>
                <span className="text-rim">•</span>
                <span className="text-yellow-400">★ {topMovie.rating}</span>
              </div>

              <p className="text-smoke/80 text-sm leading-relaxed mb-4 max-w-lg">{topMovie.description}</p>

              {/* Reason */}
              <div className="bg-ghost rounded-xl p-4 mb-5">
                <p className="text-smoke/60 text-xs uppercase tracking-widest mb-2 font-semibold">Why we picked this</p>
                <div className="flex flex-col gap-1.5">
                  {topMovie.matchReasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="text-flame">✓</span> {r}
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  type="button"
                  onClick={openTrailer}
                  disabled={trailerLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-flame rounded-xl text-white font-semibold text-sm hover:bg-ember transition-colors shadow-lg shadow-flame/20 disabled:opacity-70"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  {trailerLoading ? "Loading…" : "Watch Trailer"}
                </button>
                <button
                  onClick={() => { onToggleSave(topMovie.id); setTopSaved(!topSaved); }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors border ${
                    savedMovies.has(topMovie.id)
                      ? "bg-flame/10 border-flame/40 text-flame"
                      : "bg-ghost border-rim text-smoke hover:text-white hover:border-white/30"
                  }`}
                >
                  {savedMovies.has(topMovie.id) ? "Saved ✓" : "+ Save Movie"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More Movies ── */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-6 bg-flame/40 rounded-full" />
          <h2 className="text-white font-semibold text-lg">More movies for you</h2>
          <span className="text-smoke text-sm ml-1">{moreMovies.length} picks</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {moreMovies.map((movie) => (
            <div key={movie.id} className="relative min-w-0">
              <MovieCard
                movie={movie}
                onMovieClick={onMovieClick}
                onToggleSave={onToggleSave}
                isSaved={savedMovies.has(movie.id)}
                showMatch
                fluid
              />
            </div>
          ))}
        </div>
      </section>

      {showTrailer && trailerSrc && (
        <TrailerLightbox
          title={topMovie.title}
          embedSrc={trailerSrc}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}
