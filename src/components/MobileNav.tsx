import type { MouseEvent } from "react";
import type { Page } from "../types";
import { hrefFor, isModifiedClick } from "../lib/routing";

interface MobileNavProps {
  page: Page;
  setPage: (p: Page) => void;
  onSearch: () => void;
  savedCount: number;
}

const items = [
  {
    id: "home" as Page,
    label: "Home",
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "discover" as Page,
    label: "Discover",
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 2}>
        <circle cx="12" cy="12" r="10" />
        <polygon fill="currentColor" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: "browse" as Page,
    label: "Search",
    isSearch: true,
    icon: (_active: boolean) => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" />
        <path strokeLinecap="round" d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "saved" as Page,
    label: "Saved",
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21l-7.5-4-7.5 4V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
      </svg>
    ),
  },
];

export default function MobileNav({ page, setPage, onSearch, savedCount }: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-rim">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = page === item.id;
          const isSearch = (item as { isSearch?: boolean }).isSearch === true;

          if (isSearch) {
            return (
              <button
                key={item.id}
                onClick={onSearch}
                className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors ${
                  isActive ? "text-flame" : "text-smoke"
                }`}
              >
                {item.icon(isActive)}
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </button>
            );
          }

          return (
            <a
              key={item.id}
              href={hrefFor(item.id)}
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                if (isModifiedClick(event)) return;
                event.preventDefault();
                setPage(item.id);
              }}
              className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors ${
                isActive ? "text-flame" : "text-smoke"
              }`}
            >
              {item.icon(isActive)}
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              {item.id === "saved" && savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-flame text-white text-[9px] font-bold flex items-center justify-center">
                  {savedCount > 9 ? "9+" : savedCount}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
