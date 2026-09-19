import { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  getCachedMovie,
  getCachedMovies,
  getMovieReviews,
  getSimilarIds,
  getTrailerEmbedUrl,
} from "../lib/tmdb";
import type { Movie } from "../types";
import MovieCard from "../components/MovieCard";
import TrailerLightbox from "../components/TrailerLightbox";

interface MovieDetailProps {
  movieId: number;
  savedMovies: Set<number>;
  onToggleSave: (id: number) => void;
  onMovieClick: (id: number) => void;
  onBack: () => void;
}

export default function MovieDetail({ movieId, savedMovies, onToggleSave, onMovieClick, onBack }: MovieDetailProps) {
  const [movie, setMovie] = useState<Movie | null>(() => getCachedMovie(movieId) ?? null);
  const [loading, setLoading] = useState(!getCachedMovie(movieId));
  const [error, setError] = useState<string | null>(null);
  const [expandedReviews, setExpandedReviews] = useState(false);
  const [showAllReasons, setShowAllReasons] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    setShowTrailer(false);
    let cancelled = false;
    const cached = getCachedMovie(movieId);
    if (cached) setMovie(cached);
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const detail = await fetchMovieDetail(movieId);
        if (!cancelled) setMovie(detail);
      } catch (err) {
        if (!cancelled) {
          if (!cached) setError(err instanceof Error ? err.message : "Failed to load movie");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  if (loading && !movie) {
    return (
      <div className="min-h-screen pt-28 px-6">
        <div className="max-w-6xl mx-auto h-[50vh] rounded-3xl bg-card animate-pulse" />
      </div>
    );
  }

  if (error && !movie) {
    return (
      <div className="min-h-screen pt-28 px-6 text-center">
        <p className="text-red-300 mb-4">{error}</p>
        <button onClick={onBack} className="text-flame underline">Go back</button>
      </div>
    );
  }

  if (!movie) return null;

  const isSaved = savedMovies.has(movie.id);
  const similar = getCachedMovies(getSimilarIds(movie)).slice(0, 6);
  const reviews = getMovieReviews(movie);
  const trailerEmbed = getTrailerEmbedUrl(movie);
  const ratingPercent = (movie.rating / 10) * 100;

  return (
    <div className="min-h-screen min-w-0">
      <div className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        {movie.backdrop ? (
          <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-card" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/30 to-transparent" />

        <button
          onClick={onBack}
          className="absolute top-20 left-4 sm:left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-xl px-3 py-2 text-sm font-medium backdrop-blur-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 min-w-0">
          {movie.poster && (
            <img
              src={movie.poster}
              alt={movie.title}
              className="hidden sm:block w-36 object-cover rounded-2xl shadow-2xl border border-rim shrink-0"
              style={{ height: "216px" }}
            />
          )}
          <div className="pb-2 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres.map((g) => (
                <span key={g} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/10">
                  {g}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 break-words">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="text-smoke">{movie.year || "—"}</span>
              <span className="text-rim">•</span>
              <span className="text-smoke">{movie.duration}</span>
              <span className="text-rim">•</span>
              <span className="bg-white/10 text-white/80 px-2 py-0.5 rounded text-xs">{movie.ageRating}</span>
              <span className="text-rim">•</span>
              <span className="text-yellow-400 font-semibold">★ {movie.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 min-w-0 w-full">
        <div className="flex flex-wrap gap-3 py-6 border-b border-rim">
          {trailerEmbed ? (
            <button
              type="button"
              onClick={() => setShowTrailer(true)}
              className="flex items-center gap-2 px-6 py-3 bg-flame rounded-xl text-white font-semibold text-sm hover:bg-ember transition-colors shadow-lg shadow-flame/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Watch Trailer
            </button>
          ) : (
            <button disabled className="flex items-center gap-2 px-6 py-3 bg-flame/40 rounded-xl text-white/70 font-semibold text-sm cursor-not-allowed">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              No Trailer
            </button>
          )}
          <button
            onClick={() => onToggleSave(movie.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors border ${
              isSaved
                ? "bg-flame/10 border-flame/40 text-flame"
                : "bg-ghost border-rim text-smoke hover:text-white hover:border-white/30"
            }`}
          >
            {isSaved ? "Saved ✓" : "+ Save"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 min-w-0">
          <div className="md:col-span-2 space-y-8 min-w-0">
            <div>
              <h2 className="text-white font-semibold text-lg mb-3">About</h2>
              <p className="text-smoke/90 leading-relaxed">{movie.description}</p>
              <p className="text-smoke/60 text-sm mt-3">Directed by <span className="text-white/80">{movie.director}</span></p>
            </div>

            <div className="bg-card rounded-2xl p-5 border border-rim">
              <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-flame">✦</span> Why Watch This?
              </h2>
              <p className="text-smoke/80 text-sm italic mb-4 leading-relaxed">
                &quot;You&apos;ll probably enjoy this because you appreciate{" "}
                {movie.moodTags.slice(0, 2).join(", ").toLowerCase() || "great"} stories
                and powerful character work.&quot;
              </p>
              <div className="space-y-2">
                {(showAllReasons ? movie.matchReasons : movie.matchReasons.slice(0, 3)).map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-flame mt-0.5">✓</span>
                    {r}
                  </div>
                ))}
                {movie.matchReasons.length > 3 && (
                  <button
                    onClick={() => setShowAllReasons(!showAllReasons)}
                    className="text-flame text-xs hover:underline mt-1"
                  >
                    {showAllReasons ? "Show less" : `+${movie.matchReasons.length - 3} more reasons`}
                  </button>
                )}
              </div>
            </div>

            {movie.moodTags.length > 0 && (
              <div>
                <h2 className="text-white font-semibold mb-3">Mood Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.moodTags.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-ghost border border-rim text-sm text-smoke">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.cast.length > 0 && (
              <div>
                <h2 className="text-white font-semibold mb-4">Cast</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 min-w-0">
                  {movie.cast.map((member) => (
                    <div key={member.name} className="shrink-0 text-center w-24 min-w-24">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-card mx-auto mb-2">
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-smoke text-xs">N/A</div>
                        )}
                      </div>
                      <p className="text-white text-xs font-semibold leading-tight truncate">{member.name}</p>
                      <p className="text-smoke text-xs mt-0.5 truncate">{member.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {reviews.length > 0 && (
              <div>
                <h2 className="text-white font-semibold mb-4">Community Reviews</h2>
                <div className="bg-card rounded-2xl p-5 border border-rim mb-4">
                  <div className="flex items-center gap-5">
                    <div className="text-center">
                      <p className="font-display text-4xl font-semibold text-white">{movie.rating}</p>
                      <p className="text-smoke text-xs mt-1">TMDB /10</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-ghost rounded-full overflow-hidden">
                        <div className="h-full bg-flame rounded-full" style={{ width: `${ratingPercent}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {(expandedReviews ? reviews : reviews.slice(0, 2)).map((review, i) => (
                    <div key={i} className="bg-card rounded-2xl p-4 border border-rim">
                      <div className="flex items-center gap-3 mb-2">
                        {review.avatar ? (
                          <img src={review.avatar} alt={review.user} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-ghost" />
                        )}
                        <div>
                          <p className="text-white text-sm font-medium">{review.user}</p>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <svg key={n} className={`w-3 h-3 ${n <= review.rating ? "text-yellow-400" : "text-rim"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-smoke/80 text-sm">{review.text}</p>
                    </div>
                  ))}
                  {reviews.length > 2 && (
                    <button
                      onClick={() => setExpandedReviews(!expandedReviews)}
                      className="text-flame text-sm hover:underline"
                    >
                      {expandedReviews ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 min-w-0">
            <div className="bg-card rounded-2xl p-5 border border-rim space-y-4">
              <h3 className="text-white font-semibold text-sm">Movie Info</h3>
              {[
                { label: "Director", value: movie.director },
                { label: "Year", value: movie.year ? String(movie.year) : "—" },
                { label: "Duration", value: movie.duration },
                { label: "Age Rating", value: movie.ageRating },
                { label: "Era", value: movie.era || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-smoke">{label}</span>
                  <span className="text-white font-medium text-right ml-4">{value}</span>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-5 border border-rim text-center">
              <p className="text-smoke text-xs uppercase tracking-widest mb-3 font-semibold">TMDB Rating</p>
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 -rotate-90">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#18181B" strokeWidth="6" />
                  <circle
                    cx="48" cy="48" r="40"
                    fill="none"
                    stroke="#FF5C35"
                    strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 40 * ratingPercent / 100} ${2 * Math.PI * 40}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-2xl font-bold text-white">{movie.rating}</span>
                  <span className="text-smoke/60 text-xs">/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-12 min-w-0">
            <h2 className="text-white font-semibold text-xl mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
              {similar.map((m) => (
                <MovieCard
                  key={m.id}
                  movie={m}
                  onMovieClick={onMovieClick}
                  onToggleSave={onToggleSave}
                  isSaved={savedMovies.has(m.id)}
                  showMatch={false}
                  fluid
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showTrailer && trailerEmbed && (
        <TrailerLightbox
          title={movie.title}
          embedSrc={trailerEmbed}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}
