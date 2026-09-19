import { MOVIES, DISCOVER_SECTIONS } from "../data/movies";
import MovieCard from "../components/MovieCard";

interface DiscoverProps {
  savedMovies: Set<number>;
  onToggleSave: (id: number) => void;
  onMovieClick: (id: number) => void;
}

const movieById = (id: number) => MOVIES.find((m) => m.id === id);

export default function Discover({ savedMovies, onToggleSave, onMovieClick }: DiscoverProps) {
  return (
    <div className="min-h-screen pt-20 pb-24">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="inline-flex items-center gap-2 bg-flame/10 border border-flame/20 rounded-full px-4 py-1.5 mb-4">
          <span className="text-flame text-sm font-medium">✦ Curated collections</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
          Explore movies<br />
          <em className="italic font-light text-smoke">differently.</em>
        </h1>
        <p className="text-smoke text-lg mt-3 max-w-xl">
          Hand-picked collections for every mood, moment, and mindset.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-12 pb-8">
        {DISCOVER_SECTIONS.map((section) => {
          const sectionMovies = section.ids.map(movieById).filter(Boolean) as typeof MOVIES;
          return (
            <div key={section.id}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-semibold text-lg sm:text-xl flex items-center gap-2">
                    <span>{section.icon}</span>
                    {section.label}
                  </h2>
                  <button className="text-smoke text-sm hover:text-white transition-colors">
                    See all →
                  </button>
                </div>
              </div>
              <div className="pl-4 sm:pl-6 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
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
                  {/* See more ghost card */}
                  <div className="w-52 shrink-0 h-80 rounded-2xl border border-rim bg-card/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-flame/30 hover:bg-card transition-colors">
                    <span className="text-3xl">→</span>
                    <span className="text-smoke text-sm font-medium px-4 text-center">See all {section.label}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
