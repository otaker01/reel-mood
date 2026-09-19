import { useState, useEffect, useRef } from "react";
import { MOVIES } from "../data/movies";
import type { Movie } from "../types";

interface SearchOverlayProps {
  onClose: () => void;
  onMovieSelect: (id: number) => void;
}

const POPULAR_SEARCHES = ["Emotional drama", "Feel-good movies", "Mind-bending sci-fi", "Date night films", "Hidden gems"];
const GENRES = ["Action", "Drama", "Comedy", "Horror", "Romance", "Sci-Fi", "Thriller", "Animation"];

export default function SearchOverlay({ onClose, onMovieSelect }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      MOVIES.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q)) ||
          m.director.toLowerCase().includes(q) ||
          m.moods.some((mood) => mood.includes(q))
      ).slice(0, 6)
    );
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-xl flex flex-col"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Search bar */}
      <div className="pt-20 pb-4 px-4 sm:px-8 max-w-3xl mx-auto w-full">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-smoke pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies, directors, genres..."
            className="w-full bg-card border border-rim rounded-2xl pl-12 pr-4 py-4 text-white placeholder-smoke text-lg outline-none focus:border-flame/50 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-smoke hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-8 max-w-3xl mx-auto w-full">
        {/* Search results */}
        {results.length > 0 ? (
          <div className="space-y-2 pb-8">
            <p className="text-smoke text-sm font-medium mb-3">
              {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
            {results.map((movie) => (
              <button
                key={movie.id}
                onClick={() => { onMovieSelect(movie.id); onClose(); }}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-ghost transition-colors text-left"
              >
                <img src={movie.poster} alt={movie.title} className="w-10 h-15 object-cover rounded-lg bg-card" style={{ height: "56px" }} />
                <div>
                  <p className="text-white font-semibold">{movie.title}</p>
                  <p className="text-smoke text-sm">{movie.year} • {movie.genres.join(", ")} • ★ {movie.rating}</p>
                </div>
              </button>
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="text-center py-16">
            <p className="text-smoke text-lg">No results for &quot;{query}&quot;</p>
            <p className="text-smoke/60 text-sm mt-1">Try a genre or mood instead</p>
          </div>
        ) : (
          <div className="pb-8 space-y-8">
            {/* Popular searches */}
            <div>
              <p className="text-smoke text-xs font-semibold uppercase tracking-widest mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-4 py-2 rounded-full bg-ghost border border-rim text-sm text-white hover:border-flame/40 hover:text-flame transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse by genre */}
            <div>
              <p className="text-smoke text-xs font-semibold uppercase tracking-widest mb-3">Browse by Genre</p>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setQuery(g)}
                    className="px-4 py-2 rounded-full bg-ghost border border-rim text-sm text-white hover:border-flame/40 hover:text-flame transition-colors"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <p className="text-smoke text-xs font-semibold uppercase tracking-widest mb-3">Trending Now</p>
              <div className="space-y-2">
                {MOVIES.slice(0, 4).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { onMovieSelect(m.id); onClose(); }}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-ghost transition-colors text-left"
                  >
                    <img src={m.poster} alt={m.title} className="w-10 rounded-lg bg-card object-cover" style={{ height: "56px" }} />
                    <div>
                      <p className="text-white font-semibold">{m.title}</p>
                      <p className="text-smoke text-sm">{m.year} • ★ {m.rating}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close hint */}
      <div className="p-4 text-center">
        <button onClick={onClose} className="text-smoke/60 text-sm hover:text-smoke transition-colors">
          Press Esc or tap outside to close
        </button>
      </div>
    </div>
  );
}
