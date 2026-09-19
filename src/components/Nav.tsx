import type { MouseEvent } from "react";
import type { Page } from "../types";
import { hrefFor, isModifiedClick } from "../lib/routing";

interface NavProps {
  page: Page;
  setPage: (p: Page) => void;
  onSearch: () => void;
  savedCount: number;
}

export default function Nav({ page, setPage, onSearch, savedCount }: NavProps) {
  const navLinks: { label: string; id: Page }[] = [
    { label: "Discover", id: "discover" },
    { label: "Browse", id: "browse" },
    { label: "Categories", id: "categories" },
  ];

  const go = (event: MouseEvent<HTMLAnchorElement>, next: Page) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    setPage(next);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-rim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 min-w-0">
        {/* Logo */}
        <a
          href={hrefFor("home")}
          onClick={(event) => go(event, "home")}
          className="flex items-center shrink-0 group"
          aria-label="MoovieMatch home"
        >
          <img
            src="/mm%20logo%20full%20(1).svg"
            alt="MoovieMatch"
            className="h-7 sm:h-8 w-auto max-w-[min(200px,48vw)]"
          />
        </a>

        {/* Center nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={hrefFor(link.id)}
              onClick={(event) => go(event, link.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === link.id
                  ? "text-white bg-ghost"
                  : "text-smoke hover:text-white hover:bg-ghost"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onSearch}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-smoke hover:text-white hover:bg-ghost transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <a
            href={hrefFor("saved")}
            onClick={(event) => go(event, "saved")}
            className={`relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-ghost transition-colors ${
              page === "saved" ? "text-white" : "text-smoke hover:text-white"
            }`}
            aria-label="Saved movies"
          >
            <svg className="w-5 h-5" fill={page === "saved" ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21l-7.5-4-7.5 4V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-flame text-white text-[10px] font-semibold flex items-center justify-center">
                {savedCount > 9 ? "9+" : savedCount}
              </span>
            )}
          </a>

        </div>
      </div>
    </nav>
  );
}
