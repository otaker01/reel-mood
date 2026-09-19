import type { Filters } from "../types";

interface HomeProps {
  filters: Filters;
  setFilters: (f: Filters) => void;
  onDiscover: () => void;
}

const MOODS = [
  { id: "happy", label: "Happy", emoji: "😊", color: "from-yellow-500/25 to-orange-500/25", ring: "ring-yellow-500/60" },
  { id: "lonely", label: "Lonely", emoji: "😔", color: "from-blue-600/25 to-indigo-800/25", ring: "ring-blue-500/60" },
  { id: "emotional", label: "Emotional", emoji: "😭", color: "from-purple-600/25 to-pink-600/25", ring: "ring-purple-500/60" },
  { id: "relaxed", label: "Relaxed", emoji: "😌", color: "from-teal-600/25 to-cyan-700/25", ring: "ring-teal-500/60" },
  { id: "scared", label: "Scared", emoji: "😨", color: "from-red-900/25 to-zinc-900/25", ring: "ring-red-700/60" },
  { id: "angry", label: "Intense", emoji: "😤", color: "from-red-600/25 to-orange-700/25", ring: "ring-red-500/60" },
  { id: "mind-blown", label: "Mind-Blown", emoji: "🤯", color: "from-violet-600/25 to-fuchsia-700/25", ring: "ring-violet-500/60" },
  { id: "tired", label: "Tired", emoji: "🥱", color: "from-zinc-700/25 to-zinc-900/25", ring: "ring-zinc-500/60" },
  { id: "romantic", label: "Romantic", emoji: "😍", color: "from-rose-600/25 to-pink-700/25", ring: "ring-rose-500/60" },
  { id: "funny", label: "Funny Mood", emoji: "😂", color: "from-yellow-400/25 to-amber-500/25", ring: "ring-amber-400/60" },
];

const SITUATIONS = [
  { id: "alone", label: "Solo Night", icon: "🌙" },
  { id: "partner", label: "Date Night", icon: "❤️" },
  { id: "friends", label: "With Friends", icon: "👥" },
  { id: "family", label: "Family Time", icon: "👨‍👩‍👧" },
  { id: "background", label: "Background", icon: "📱" },
  { id: "movienight", label: "Movie Night", icon: "🍿" },
];

const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Horror",
  "Romance", "Thriller", "Sci-Fi", "Fantasy", "Mystery",
  "Crime", "Animation", "Documentary", "Family", "War", "Music",
];

const WATCH_TIMES = [
  { id: "under90", label: "Under 90 min", icon: "⚡" },
  { id: "under120", label: "Under 2 hours", icon: "🕐" },
  { id: "over120", label: "2+ hours", icon: "🎭" },
  { id: "any", label: "Any length", icon: "∞" },
];

const ERAS = [
  { id: "Classic", label: "Classic", sub: "Pre-70s" },
  { id: "1980s", label: "80s", sub: "1980–89" },
  { id: "1990s", label: "90s", sub: "1990–99" },
  { id: "2000s", label: "2000s", sub: "2000–09" },
  { id: "2010s", label: "2010s", sub: "2010–19" },
  { id: "2020s", label: "Now", sub: "2020+" },
  { id: "any", label: "Any", sub: "All eras" },
];

const ENERGY = [
  { level: 1, label: "Low", desc: "Calm & slow", icon: "🌿" },
  { level: 2, label: "Relaxed", desc: "Easygoing", icon: "☁️" },
  { level: 3, label: "Medium", desc: "Balanced", icon: "⚖️" },
  { level: 4, label: "High", desc: "Fast-paced", icon: "⚡" },
];

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export default function Home({ filters, setFilters, onDiscover }: HomeProps) {
  const activeFilterCount =
    filters.moods.length +
    filters.situations.length +
    filters.genres.length +
    (filters.energyLevel > 0 ? 1 : 0) +
    (filters.watchTime ? 1 : 0) +
    (filters.era ? 1 : 0);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&h=1080&fit=crop&auto=format&q=80)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.4) 50%, rgba(10,10,11,1) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,11,0.5) 0%, transparent 50%, rgba(10,10,11,0.5) 100%)" }} />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 bg-flame/10 border border-flame/25 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-flame animate-pulse" />
            <span className="text-flame text-sm font-medium tracking-wide">Mood-based discovery</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-5">
            What do you feel<br />
            <em className="italic font-normal text-flame">like watching?</em>
          </h1>

          <p className="text-white/60 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            Answer a few quick questions and we'll find the perfect film for your mood, right now.
          </p>

          <a
            href="#step-1"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-flame rounded-xl text-white font-semibold text-sm shadow-xl shadow-flame/30 hover:bg-ember transition-all hover:scale-[1.02]"
          >
            <span>🎬</span> Start Matching
          </a>

          <div className="flex flex-col items-center gap-1.5 animate-bounce mt-5">
            <span className="text-white/40 text-xs">Scroll down</span>
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Filter Wizard ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-60 md:pb-48">

        {/* Step 1 — Mood */}
        <section id="step-1" className="pt-16 pb-10">
          <StepHeader step={1} title="How are you feeling?" subtitle="Pick everything that applies — no wrong answers." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {MOODS.map((mood) => {
              const active = filters.moods.includes(mood.id);
              return (
                <button
                  key={mood.id}
                  onClick={() => setFilters({ ...filters, moods: toggle(filters.moods, mood.id) })}
                  className={`relative rounded-2xl p-4 text-left transition-all duration-200 bg-gradient-to-br ${mood.color} ${
                    active
                      ? `ring-2 ${mood.ring} scale-[1.03] shadow-lg`
                      : "ring-1 ring-white/8 hover:ring-white/20 hover:scale-[1.01]"
                  }`}
                  style={{ backgroundColor: active ? undefined : "rgba(255,255,255,0.03)" }}
                >
                  {active && (
                    <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-flame flex items-center justify-center shadow-md">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <span className="text-3xl block mb-2.5">{mood.emoji}</span>
                  <span className={`text-sm font-semibold leading-tight ${active ? "text-white" : "text-white/75"}`}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* Step 2 — Situation */}
        <section className="py-10">
          <StepHeader step={2} title="Who are you watching with?" subtitle="Sets the right tone for your pick." />
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SITUATIONS.map((sit) => {
              const active = filters.situations.includes(sit.id);
              return (
                <button
                  key={sit.id}
                  onClick={() => setFilters({ ...filters, situations: toggle(filters.situations, sit.id) })}
                  className={`rounded-2xl py-5 px-3 flex flex-col items-center gap-2.5 transition-all duration-200 ${
                    active
                      ? "bg-flame/15 ring-2 ring-flame/60 scale-[1.03] shadow-lg shadow-flame/10"
                      : "bg-white/3 ring-1 ring-white/8 hover:ring-white/20 hover:bg-white/5 hover:scale-[1.01]"
                  }`}
                >
                  <span className="text-2xl">{sit.icon}</span>
                  <span className={`text-xs font-semibold leading-tight text-center ${active ? "text-white" : "text-white/65"}`}>
                    {sit.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* Step 3 — Energy */}
        <section className="py-10">
          <StepHeader step={3} title="What's your energy level?" subtitle="How fast-paced or intense do you want it?" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ENERGY.map((e) => {
              const active = filters.energyLevel === e.level;
              return (
                <button
                  key={e.level}
                  onClick={() => setFilters({ ...filters, energyLevel: active ? 0 : e.level })}
                  className={`rounded-2xl p-5 text-left transition-all duration-200 ${
                    active
                      ? "bg-flame/15 ring-2 ring-flame/60 scale-[1.02] shadow-lg shadow-flame/10"
                      : "bg-white/3 ring-1 ring-white/8 hover:ring-white/20 hover:bg-white/5 hover:scale-[1.01]"
                  }`}
                >
                  <span className="text-2xl block mb-2">{e.icon}</span>
                  <span className={`text-sm font-bold block ${active ? "text-flame" : "text-white/80"}`}>{e.label}</span>
                  <span className={`text-xs mt-0.5 block ${active ? "text-white/70" : "text-white/40"}`}>{e.desc}</span>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* Step 4 — Genres */}
        <section className="py-10">
          <StepHeader step={4} title="Any genres calling to you?" subtitle="Optional — leave blank to stay open." />
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => {
              const active = filters.genres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => setFilters({ ...filters, genres: toggle(filters.genres, genre) })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                    active
                      ? "bg-flame text-white shadow-md shadow-flame/25 scale-[1.02]"
                      : "bg-white/5 ring-1 ring-white/10 text-white/65 hover:ring-white/25 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* Step 5 — Time + Era */}
        <section className="py-10">
          <StepHeader step={5} title="One last thing…" subtitle="Fine-tune by time and era if you like." />
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Watch time */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">How much time?</p>
              <div className="grid grid-cols-2 gap-2">
                {WATCH_TIMES.map((wt) => {
                  const active = filters.watchTime === wt.id;
                  return (
                    <button
                      key={wt.id}
                      onClick={() => setFilters({ ...filters, watchTime: active ? "" : wt.id })}
                      className={`flex items-center gap-2.5 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-150 ${
                        active
                          ? "bg-flame/15 ring-2 ring-flame/60 text-white scale-[1.02]"
                          : "bg-white/3 ring-1 ring-white/8 text-white/60 hover:ring-white/20 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{wt.icon}</span>
                      <span>{wt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Era */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Which era?</p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
                {ERAS.map((era) => {
                  const active = filters.era === era.id;
                  return (
                    <button
                      key={era.id}
                      onClick={() => setFilters({ ...filters, era: active ? "" : era.id })}
                      className={`flex flex-col items-center py-3 px-2 rounded-xl text-center transition-all duration-150 ${
                        active
                          ? "bg-flame/15 ring-2 ring-flame/60 scale-[1.04]"
                          : "bg-white/3 ring-1 ring-white/8 hover:ring-white/20"
                      }`}
                    >
                      <span className={`text-sm font-bold leading-none ${active ? "text-flame" : "text-white/80"}`}>{era.label}</span>
                      <span className={`text-[10px] mt-1 ${active ? "text-white/60" : "text-white/35"}`}>{era.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── Floating CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        {/* sits above mobile nav (80px) on mobile, floats centered on desktop */}
        <div className="md:max-w-sm md:mx-auto md:mb-6 md:px-0 px-4" style={{ paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px))" }}>
          <div
            className="rounded-2xl md:rounded-2xl p-4 md:p-3 flex items-center gap-4 border border-white/10 shadow-2xl"
            style={{ background: "rgba(16,16,18,0.92)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex-1 min-w-0">
              {activeFilterCount > 0 ? (
                <>
                  <p className="text-white text-sm font-semibold">
                    {activeFilterCount} preference{activeFilterCount !== 1 ? "s" : ""} set
                  </p>
                  <p className="text-white/45 text-xs mt-0.5">Ready to find your film</p>
                </>
              ) : (
                <>
                  <p className="text-white/60 text-sm">Skip filters</p>
                  <p className="text-white/35 text-xs mt-0.5">We'll pick our top matches</p>
                </>
              )}
            </div>
            <button
              onClick={onDiscover}
              className="shrink-0 px-5 py-2.5 bg-flame rounded-xl text-white font-semibold text-sm shadow-lg shadow-flame/30 hover:bg-ember transition-all hover:scale-[1.02] active:scale-95"
            >
              Find Movies →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepHeader({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mt-1"
        style={{ background: "rgba(255,92,53,0.15)", color: "#FF5C35", border: "1px solid rgba(255,92,53,0.3)" }}
      >
        {step}
      </div>
      <div>
        <h2 className="font-display text-2xl sm:text-3xl text-white font-semibold leading-tight">{title}</h2>
        {subtitle && <p className="text-white/45 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-white/6" />;
}
