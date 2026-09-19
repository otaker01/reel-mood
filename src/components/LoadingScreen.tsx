import { useState, useEffect } from "react";

const STEPS = [
  "Analyzing your mood...",
  "Finding hidden gems...",
  "Matching your preferences...",
  "Curating your watchlist...",
  "Almost there...",
];

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, 480);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center">
      {/* Animated film reel */}
      <div className="relative w-20 h-20 mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-card flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-flame animate-pulse" />
          </div>
        </div>
        {/* Spinning arc */}
        <svg className="absolute inset-0 w-20 h-20 -rotate-90 animate-spin" style={{ animationDuration: "1.5s" }}>
          <circle cx="40" cy="40" r="38" fill="none" stroke="#FF5C35" strokeWidth="2" strokeDasharray="60 180" strokeLinecap="round" />
        </svg>
      </div>

      <h2 className="font-display text-2xl text-white mb-2">Finding your perfect movie...</h2>

      <div className="h-6 flex items-center justify-center">
        <p key={stepIndex} className="text-smoke text-sm fade-up">
          {STEPS[stepIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i <= stepIndex ? "bg-flame scale-125" : "bg-card"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
