import { useState } from "react";
import { MOVIES, STREAMING_LOGOS } from "../data/movies";
import MovieCard from "../components/MovieCard";

interface MovieDetailProps {
  movieId: number;
  savedMovies: Set<number>;
  onToggleSave: (id: number) => void;
  onMovieClick: (id: number) => void;
  onBack: () => void;
}

const REVIEWS = [
  { user: "Alex M.", rating: 5, text: "One of the most visually and emotionally powerful films I've ever seen.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format" },
  { user: "Sarah K.", rating: 4, text: "Stunning cinematography and a story that will stay with you for days.", avatar: "https://images.unsplash.com/photo-1759354192456-71975b190c51?w=48&h=48&fit=crop&auto=format" },
  { user: "Marcus T.", rating: 5, text: "A masterwork. Every frame feels intentional. Deserves multiple watches.", avatar: "https://images.unsplash.com/photo-1637059880830-59a90102de77?w=48&h=48&fit=crop&auto=format" },
];

export default function MovieDetail({ movieId, savedMovies, onToggleSave, onMovieClick, onBack }: MovieDetailProps) {
  const movie = MOVIES.find((m) => m.id === movieId);
  const [expandedReviews, setExpandedReviews] = useState(false);
  const [showAllReasons, setShowAllReasons] = useState(false);

  if (!movie) return null;

  const isSaved = savedMovies.has(movie.id);
  const similar = MOVIES.filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g))).slice(0, 6);

  const ratingPercent = (movie.rating / 10) * 100;

  return (
    <div className="min-h-screen">
      {/* Hero backdrop */}
      <div className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-20 left-4 sm:left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-xl px-3 py-2 text-sm font-medium backdrop-blur-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Movie poster + core info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-end sm:items-end gap-6">
          <img
            src={movie.poster}
            alt={movie.title}
            className="hidden sm:block w-36 h-54 object-cover rounded-2xl shadow-2xl border border-rim shrink-0"
            style={{ height: "216px" }}
          />
          <div className="pb-2">
            {/* Genre pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres.map((g) => (
                <span key={g} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/10">
                  {g}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="text-smoke">{movie.year}</span>
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

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 py-6 border-b border-rim">
          <button className="flex items-center gap-2 px-6 py-3 bg-flame rounded-xl text-white font-semibold text-sm hover:bg-ember transition-colors shadow-lg shadow-flame/20">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Watch Trailer
          </button>
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
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-ghost border border-rim text-smoke hover:text-white hover:border-white/30 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
            Share
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-8">
          {/* Left — description + why + streaming */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-white font-semibold text-lg mb-3">About</h2>
              <p className="text-smoke/90 leading-relaxed">{movie.description}</p>
              <p className="text-smoke/60 text-sm mt-3">Directed by <span className="text-white/80">{movie.director}</span></p>
            </div>

            {/* Why watch */}
            <div className="bg-card rounded-2xl p-5 border border-rim">
              <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-flame">✦</span> Why Watch This?
              </h2>
              <p className="text-smoke/80 text-sm italic mb-4 leading-relaxed">
                &quot;You&apos;ll probably enjoy this because you appreciate{" "}
                {movie.moodTags.slice(0, 2).join(", ").toLowerCase()} stories
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

            {/* Mood tags */}
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

            {/* Cast */}
            <div>
              <h2 className="text-white font-semibold mb-4">Cast</h2>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {movie.cast.map((member) => (
                  <div key={member.name} className="shrink-0 text-center w-24">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-card mx-auto mb-2">
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-white text-xs font-semibold leading-tight">{member.name}</p>
                    <p className="text-smoke text-xs mt-0.5">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-white font-semibold mb-4">Community Reviews</h2>

              {/* Rating breakdown */}
              <div className="bg-card rounded-2xl p-5 border border-rim mb-4">
                <div className="flex items-center gap-5">
                  <div className="text-center">
                    <p className="font-display text-4xl font-semibold text-white">{movie.rating}</p>
                    <div className="flex gap-0.5 mt-1 justify-center">
                      {[1,2,3,4,5].map((i) => (
                        <svg key={i} className={`w-4 h-4 ${i <= Math.round(movie.rating / 2) ? "text-yellow-400" : "text-rim"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-smoke text-xs mt-1">out of 10</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map((star) => {
                      const pct = star === 5 ? 65 : star === 4 ? 22 : star === 3 ? 8 : star === 2 ? 3 : 2;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="text-smoke w-3">{star}</span>
                          <div className="flex-1 h-1.5 bg-ghost rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-smoke/60 w-8 text-right">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* User reviews */}
              <div className="space-y-3">
                {(expandedReviews ? REVIEWS : REVIEWS.slice(0, 2)).map((review, i) => (
                  <div key={i} className="bg-card rounded-2xl p-4 border border-rim">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={review.avatar} alt={review.user} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-white text-sm font-medium">{review.user}</p>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((i) => (
                            <svg key={i} className={`w-3 h-3 ${i <= review.rating ? "text-yellow-400" : "text-rim"}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-smoke/80 text-sm">{review.text}</p>
                  </div>
                ))}
                {REVIEWS.length > 2 && (
                  <button
                    onClick={() => setExpandedReviews(!expandedReviews)}
                    className="text-flame text-sm hover:underline"
                  >
                    {expandedReviews ? "Show fewer reviews" : `Show all ${REVIEWS.length} reviews`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Quick stats */}
            <div className="bg-card rounded-2xl p-5 border border-rim space-y-4">
              <h3 className="text-white font-semibold text-sm">Movie Info</h3>
              {[
                { label: "Director", value: movie.director },
                { label: "Year", value: String(movie.year) },
                { label: "Duration", value: movie.duration },
                { label: "Age Rating", value: movie.ageRating },
                { label: "Era", value: movie.era },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-smoke">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Rating circle */}
            <div className="bg-card rounded-2xl p-5 border border-rim text-center">
              <p className="text-smoke text-xs uppercase tracking-widest mb-3 font-semibold">IMDb Rating</p>
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

            {/* Streaming */}
            <div className="bg-card rounded-2xl p-5 border border-rim">
              <h3 className="text-white font-semibold text-sm mb-3">Where to Watch</h3>
              <div className="space-y-2">
                {movie.streamingOn.map((s) => {
                  const info = STREAMING_LOGOS[s];
                  if (!info) return null;
                  return (
                    <div key={s} className={`${info.color} rounded-lg px-4 py-2.5 text-white text-sm font-semibold text-center cursor-pointer hover:opacity-90 transition-opacity`}>
                      {info.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Similar movies */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-white font-semibold text-xl mb-6">Similar Movies</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
              {similar.map((m) => (
                <MovieCard
                  key={m.id}
                  movie={m}
                  onMovieClick={onMovieClick}
                  onToggleSave={onToggleSave}
                  isSaved={savedMovies.has(m.id)}
                  showMatch={false}
                  size="md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
