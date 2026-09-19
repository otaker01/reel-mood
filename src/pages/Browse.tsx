import { useState, useMemo } from "react";
import { MOVIES } from "../data/movies";
import MovieCard from "../components/MovieCard";

interface BrowseProps {
  savedMovies: Set<number>;
  onToggleSave: (id: number) => void;
  onMovieClick: (id: number) => void;
}

const ALL_GENRES = ["All", "Action", "Adventure", "Comedy", "Drama", "Horror", "Romance", "Thriller", "Sci-Fi", "Fantasy", "Mystery", "Animation", "Music"];
const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "rating", label: "Highest Rated" },
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
];
const DURATION_OPTIONS = [
  { id: "", label: "Any Duration" },
  { id: "short", label: "Under 90 min" },
  { id: "medium", label: "90–120 min" },
  { id: "long", label: "2+ hours" },
];

export default function Browse({ savedMovies, onToggleSave, onMovieClick }: BrowseProps) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [duration, setDuration] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = [...MOVIES];

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q))
      );
    }

    if (genre !== "All") {
      results = results.filter((m) => m.genres.includes(genre));
    }

    if (duration === "short") results = results.filter((m) => m.durationMins < 90);
    else if (duration === "medium") results = results.filter((m) => m.durationMins >= 90 && m.durationMins <= 120);
    else if (duration === "long") results = results.filter((m) => m.durationMins > 120);

    if (sortBy === "rating") results.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "newest") results.sort((a, b) => b.year - a.year);
    else if (sortBy === "oldest") results.sort((a, b) => a.year - b.year);

    return results;
  }, [query, genre, sortBy, duration]);

  return (
    <div className="min-h-screen pt-20 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <div className="pt-8 pb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-1">Browse Movies</h1>
        <p className="text-smoke text-sm">{filtered.length} movies found</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-smoke pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, actors, directors..."
          className="w-full bg-card border border-rim rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-smoke text-sm outline-none focus:border-flame/40 transition-colors"
        />
      </div>

      {/* Genre pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        {ALL_GENRES.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border shrink-0 ${
              genre === g
                ? "bg-flame text-white border-flame"
                : "bg-card border-rim text-smoke hover:text-white hover:border-white/30"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Filters toggle */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-smoke text-sm hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          Advanced Filters
          {(duration || sortBy !== "rating") && (
            <span className="w-2 h-2 rounded-full bg-flame" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-smoke/60 text-xs">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card border border-rim rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-flame/40"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced filters panel */}
      {showFilters && (
        <div className="mb-6 p-5 bg-card rounded-2xl border border-rim">
          <div>
            <p className="text-smoke text-xs font-semibold uppercase tracking-widest mb-3">Duration</p>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDuration(opt.id)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                    duration === opt.id
                      ? "bg-flame/15 border-flame/50 text-flame"
                      : "border-rim text-smoke hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filtered.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={onMovieClick}
              onToggleSave={onToggleSave}
              isSaved={savedMovies.has(movie.id)}
              showMatch={false}
              size="md"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-5xl">🎬</span>
          <h3 className="font-display text-2xl text-white">No movies found</h3>
          <p className="text-smoke text-sm">Try adjusting your search or filters</p>
          <button
            onClick={() => { setQuery(""); setGenre("All"); setDuration(""); }}
            className="px-6 py-2.5 bg-flame rounded-xl text-white text-sm font-semibold hover:bg-ember transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
