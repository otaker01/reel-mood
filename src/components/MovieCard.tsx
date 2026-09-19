import { useState } from "react";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie & { match?: number };
  onMovieClick: (id: number) => void;
  onToggleSave: (id: number) => void;
  isSaved: boolean;
  showMatch?: boolean;
  size?: "sm" | "md" | "lg";
  fluid?: boolean;
}

export default function MovieCard({
  movie,
  onMovieClick,
  onToggleSave,
  isSaved,
  showMatch = true,
  size = "md",
  fluid = false,
}: MovieCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const width = fluid
    ? "w-full min-w-0"
    : size === "sm"
      ? "w-28 sm:w-32 shrink-0 snap-start"
      : size === "lg"
        ? "w-36 sm:w-48 md:w-52 lg:w-56 shrink-0 snap-start"
        : "w-32 sm:w-40 md:w-44 shrink-0 snap-start";

  const matchColor =
    (movie.match ?? 0) >= 90
      ? "text-green-400"
      : (movie.match ?? 0) >= 75
      ? "text-yellow-400"
      : "text-smoke";

  return (
    <div className={`relative ${width} group cursor-pointer`} onClick={() => onMovieClick(movie.id)}>
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-card">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={movie.poster}
          alt={movie.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover overlay actions */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleSave(movie.id); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isSaved
                  ? "bg-flame text-white"
                  : "bg-white/10 text-white hover:bg-flame"
              }`}
            >
              {isSaved ? "Saved ✓" : "+ Save"}
            </button>
            {movie.matchReasons && (
              <button
                onClick={(e) => { e.stopPropagation(); setShowWhy(!showWhy); }}
                className="px-2 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                title="Why this movie?"
              >
                ?
              </button>
            )}
          </div>
        </div>

        {/* Match badge */}
        {showMatch && movie.match !== undefined && (
          <div className="absolute top-2 left-2">
            <span className={`text-[11px] font-bold bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full ${matchColor}`}>
              {movie.match}%
            </span>
          </div>
        )}

        {/* Age rating badge */}
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-semibold bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-smoke">
            {movie.ageRating}
          </span>
        </div>
      </div>

      {/* Why this movie tooltip */}
      {showWhy && movie.matchReasons && (
        <div
          className="absolute z-20 mt-1 p-3 bg-card border border-rim rounded-xl shadow-2xl w-full max-w-[13rem] text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-smoke font-semibold mb-2 uppercase tracking-wide text-[10px]">Why we picked this</p>
          {movie.matchReasons.map((reason, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
              <span className="text-flame mt-0.5">✓</span>
              <span className="text-white/80">{reason}</span>
            </div>
          ))}
          <button
            onClick={(e) => { e.stopPropagation(); setShowWhy(false); }}
            className="mt-2 text-smoke hover:text-white text-[10px]"
          >
            Close
          </button>
        </div>
      )}

      {/* Info below poster */}
      <div className="mt-2 px-0.5 min-w-0">
        <h3 className="text-white text-sm font-semibold leading-tight truncate group-hover:text-flame transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
          <span className="text-smoke text-xs shrink-0">{movie.year}</span>
          <span className="text-rim text-xs shrink-0">•</span>
          <span className="text-yellow-400 text-xs truncate">★ {movie.rating}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {movie.genres.slice(0, 2).map((g) => (
            <span key={g} className="text-[10px] text-smoke/80 bg-ghost px-1.5 py-0.5 rounded-md max-w-full truncate">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
