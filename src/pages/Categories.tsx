interface CategoriesProps {
  onCategorySelect: (mood: string) => void;
}

const MOOD_CATEGORIES = [
  { id: "funny", label: "Make Me Laugh", emoji: "😂", desc: "Comedies, feel-good films, and light watches", color: "from-yellow-500/30 to-amber-600/20", count: 24 },
  { id: "emotional", label: "Make Me Cry", emoji: "😭", desc: "Emotionally powerful dramas and tearjerkers", color: "from-blue-600/30 to-indigo-700/20", count: 31 },
  { id: "mind-blown", label: "Blow My Mind", emoji: "🧠", desc: "Mind-bending sci-fi and psychological thrillers", color: "from-violet-600/30 to-purple-800/20", count: 18 },
  { id: "scared", label: "Scare Me", emoji: "😨", desc: "Horror, suspense, and nightmare fuel", color: "from-red-900/30 to-zinc-900/20", count: 15 },
  { id: "romantic", label: "Make Me Feel Something", emoji: "❤️", desc: "Love stories, romance, and heartfelt drama", color: "from-rose-600/30 to-pink-700/20", count: 22 },
  { id: "relaxed", label: "Help Me Relax", emoji: "😌", desc: "Calm, beautiful, slow-paced cinema", color: "from-teal-600/30 to-cyan-700/20", count: 19 },
  { id: "angry", label: "Something Intense", emoji: "😤", desc: "High-stakes thrillers, war films, powerful drama", color: "from-orange-600/30 to-red-700/20", count: 27 },
  { id: "happy", label: "Feel Good", emoji: "✨", desc: "Warm, uplifting, and joyful movies", color: "from-green-600/30 to-emerald-700/20", count: 33 },
];

const SITUATION_CATEGORIES = [
  { id: "alone", label: "Watching Alone", emoji: "🌙", desc: "Perfect for solo late-night viewing" },
  { id: "partner", label: "Date Night", emoji: "❤️", desc: "Romantic evenings for two" },
  { id: "friends", label: "With Friends", emoji: "👥", desc: "Great for group viewing and discussion" },
  { id: "family", label: "Family Night", emoji: "👨‍👩‍👧", desc: "Fun for all ages" },
  { id: "background", label: "Rainy Day", emoji: "🌧", desc: "Cozy watches for grey afternoons" },
  { id: "movienight", label: "Late Night", emoji: "🌙", desc: "Films for the quiet, dark hours" },
];

export default function Categories({ onCategorySelect }: CategoriesProps) {
  return (
    <div className="min-h-screen pt-20 max-w-6xl mx-auto px-4 sm:px-6 pb-24 min-w-0 w-full">
      <div className="pt-8 pb-10">
        <div className="inline-flex items-center gap-2 bg-flame/10 border border-flame/20 rounded-full px-4 py-1.5 mb-4">
          <span className="text-flame text-sm font-medium">🎭 Browse by mood</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white leading-tight">
          Find your vibe.
        </h1>
        <p className="text-smoke text-lg mt-2">Pick a mood or situation to discover the perfect movie.</p>
      </div>

      {/* By Mood */}
      <section className="mb-12">
        <h2 className="text-white font-semibold text-xl mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-flame rounded-full" />
          By Mood
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className={`text-left min-w-0 rounded-3xl p-5 sm:p-6 bg-gradient-to-br ${cat.color} border border-rim hover:border-white/20 transition-all duration-200 hover:shadow-xl group`}
            >
              <span className="text-4xl block mb-4">{cat.emoji}</span>
              <h3 className="text-white font-semibold text-lg leading-tight mb-1">{cat.label}</h3>
              <p className="text-smoke/70 text-sm leading-snug mb-4">{cat.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-smoke/50 text-xs">{cat.count} movies</span>
                <span className="text-flame group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* By Situation */}
      <section>
        <h2 className="text-white font-semibold text-xl mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-flame/50 rounded-full" />
          By Situation
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SITUATION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="min-w-0 rounded-2xl p-4 sm:p-5 bg-card border border-rim hover:border-flame/30 transition-all duration-200 text-center hover:bg-card/80 group"
            >
              <span className="text-3xl block mb-3">{cat.emoji}</span>
              <h3 className="text-white text-sm font-semibold leading-tight mb-1">{cat.label}</h3>
              <p className="text-smoke/60 text-xs leading-snug">{cat.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
