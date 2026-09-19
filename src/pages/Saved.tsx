import type { Movie } from "../types";
import MovieCard from "../components/MovieCard";

interface SavedProps {
  movies: Movie[];
  onMovieClick: (id: number) => void;
  onToggleSave: (id: number) => void;
}

export default function Saved({ movies, onMovieClick, onToggleSave }: SavedProps) {
  return (
    <div className="min-h-screen pt-20 max-w-5xl mx-auto px-4 sm:px-6 pb-28 min-w-0 w-full">
      <div className="pt-8 pb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">Watchlist</h1>
        <p className="text-white/40 text-sm mt-1">
          {movies.length === 0 ? "Nothing saved yet" : `${movies.length} movie${movies.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={onMovieClick}
              onToggleSave={onToggleSave}
              isSaved
              showMatch={false}
              fluid
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center text-4xl">
            🎬
          </div>
          <h2 className="font-display text-2xl text-white">Nothing saved yet</h2>
          <p className="text-white/40 max-w-xs text-sm leading-relaxed">
            Tap the bookmark on any movie to add it here.
          </p>
        </div>
      )}
    </div>
  );
}
