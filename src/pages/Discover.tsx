import { useState, useEffect } from "react";
import { DISCOVER_SECTIONS, fetchDiscoverSection } from "../lib/tmdb";
import type { Movie } from "../types";
import MovieCard from "../components/MovieCard";

interface DiscoverProps {
  savedMovies: Set<number>;
  onToggleSave: (id: number) => void;
  onMovieClick: (id: number) => void;
}

export default function Discover({ savedMovies, onToggleSave, onMovieClick }: DiscoverProps) {
  const [sections, setSections] = useState<Record<string, Movie[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const entries = await Promise.all(
          DISCOVER_SECTIONS.map(async (section) => {
            const movies = await fetchDiscoverSection(section);
            return [section.id, movies] as const;
          }),
        );
        if (!cancelled) setSections(Object.fromEntries(entries));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load collections");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-24 min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="inline-flex items-center gap-2 bg-flame/10 border border-flame/20 rounded-full px-4 py-1.5 mb-4">
          <span className="text-flame text-sm font-medium">✦ Curated collections</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight break-words">
          Explore movies<br />
          <em className="italic font-light text-smoke">differently.</em>
        </h1>
        <p className="text-smoke text-lg mt-3 max-w-xl">
          Live collections powered by TMDB for every mood, moment, and mindset.
        </p>
      </div>

      {error && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-red-300 text-sm mb-8">{error}</div>
      )}

      {loading ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-card/60 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-12 pb-8">
          {DISCOVER_SECTIONS.map((section) => {
            const sectionMovies = sections[section.id] ?? [];
            if (!sectionMovies.length) return null;
            return (
              <div key={section.id} className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold text-lg sm:text-xl flex items-center gap-2">
                      <span>{section.icon}</span>
                      {section.label}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-3 snap-x snap-mandatory -mx-1 px-1">
                  {sectionMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onMovieClick={onMovieClick}
                      onToggleSave={onToggleSave}
                      isSaved={savedMovies.has(movie.id)}
                      showMatch={false}
                      size="lg"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
