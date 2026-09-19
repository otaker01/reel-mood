import { MOVIES } from "../data/movies";
import MovieCard from "../components/MovieCard";

interface ProfileProps {
  savedMovies: Set<number>;
  onMovieClick: (id: number) => void;
}

const PREFERENCES = [
  { label: "Preferred Genres", value: "Drama, Sci-Fi, Thriller" },
  { label: "Favorite Moods", value: "Emotional, Mind-blown" },
  { label: "Usually Watches", value: "Alone or with partner" },
  { label: "Energy Level", value: "Medium to Low" },
  { label: "Preferred Length", value: "Under 2 hours" },
];

export default function Profile({ savedMovies, onMovieClick }: ProfileProps) {
  const recentlyWatched = MOVIES.slice(0, 6);
  const favorites = MOVIES.filter((m) => m.rating >= 8.3).slice(0, 4);

  const stats = [
    { label: "Movies Watched", value: "47" },
    { label: "Saved", value: String(savedMovies.size) },
    { label: "Avg Rating", value: "8.4" },
    { label: "Fave Genre", value: "Drama" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24">
      {/* Profile hero */}
      <div
        className="relative h-40 sm:h-52"
        style={{ background: "linear-gradient(135deg, #1a0a1e 0%, #0f1a2e 50%, #180a0a 100%)" }}
      >
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #FF5C35 0%, transparent 60%), radial-gradient(circle at 80% 50%, #6B21A8 0%, transparent 60%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Avatar + basic info */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-8">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-void shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:pb-2">
            <h1 className="font-display text-2xl font-semibold text-white">Alex Rivera</h1>
            <p className="text-smoke text-sm mt-0.5">Film lover · Joined 2023</p>
            <p className="text-smoke/60 text-sm mt-1 max-w-sm">
              Obsessed with slow-burn dramas, atmospheric sci-fi, and anything that makes me think for days.
            </p>
          </div>
          <div className="sm:ml-auto sm:pb-2">
            <button className="px-5 py-2 rounded-xl bg-ghost border border-rim text-sm text-smoke hover:text-white hover:border-white/30 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-5 border border-rim text-center">
              <p className="font-display text-3xl font-semibold text-white">{stat.value}</p>
              <p className="text-smoke text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recently watched */}
        <section className="mb-10">
          <h2 className="text-white font-semibold text-xl mb-5">Recently Watched</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
            {recentlyWatched.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                onMovieClick={onMovieClick}
                onToggleSave={() => {}}
                isSaved={savedMovies.has(m.id)}
                showMatch={false}
                size="md"
              />
            ))}
          </div>
        </section>

        {/* Favorites */}
        <section className="mb-10">
          <h2 className="text-white font-semibold text-xl mb-5">Favorites</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
            {favorites.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                onMovieClick={onMovieClick}
                onToggleSave={() => {}}
                isSaved={savedMovies.has(m.id)}
                showMatch={false}
                size="md"
              />
            ))}
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-white font-semibold text-xl mb-5">Movie Preferences</h2>
          <div className="bg-card rounded-2xl border border-rim divide-y divide-rim">
            {PREFERENCES.map((pref) => (
              <div key={pref.label} className="flex items-center justify-between px-5 py-4">
                <span className="text-smoke text-sm">{pref.label}</span>
                <span className="text-white text-sm font-medium">{pref.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
