import type { MouseEvent } from "react";
import type { Page } from "../types";
import { hrefFor, isModifiedClick } from "../lib/routing";
import { TMDB_LOGO_SHORT, TMDB_NOTICE, TMDB_SITE } from "../lib/tmdbAttribution";

interface FooterProps {
  setPage: (p: Page) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const go = (event: MouseEvent<HTMLAnchorElement>, next: Page) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    setPage(next);
  };

  return (
    <footer className="relative z-[45] border-t border-rim bg-surface pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="min-w-0">
            <a
              href={hrefFor("home")}
              onClick={(event) => go(event, "home")}
              className="flex items-center mb-3 w-fit"
              aria-label="MoovieMatch home"
            >
              <img
                src="/mm%20logo%20full%20(1).svg"
                alt="MoovieMatch"
                className="h-7 w-auto max-w-[200px]"
              />
            </a>
            {/* <p className="text-smoke text-sm max-w-md leading-relaxed">
              A free movie discovery app. No accounts, no paid features, no revenue.
            </p> */}
          </div>

          <nav className="flex flex-col gap-2 text-sm shrink-0">
            <span className="text-white/40 text-xs uppercase tracking-wider font-medium">Legal</span>
            <a
              href={hrefFor("policies")}
              onClick={(event) => go(event, "policies")}
              className="text-smoke hover:text-white transition-colors w-fit"
            >
              Policies
            </a>
            <a
              href={TMDB_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke hover:text-white transition-colors w-fit"
            >
              The Movie Database
            </a>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-rim">
          <a
            href={TMDB_SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 opacity-90 hover:opacity-100 transition-opacity"
            aria-label="The Movie Database"
          >
            <img
              src={TMDB_LOGO_SHORT}
              alt="The Movie Database"
              className="h-4 w-auto"
            />
          </a>
          <p className="text-white/40 text-xs leading-relaxed max-w-2xl">
            {TMDB_NOTICE}
          </p>
        </div>
      </div>
    </footer>
  );
}
