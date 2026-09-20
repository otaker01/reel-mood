declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let lastTrackedPath =
  typeof window !== "undefined" ? window.location.pathname + window.location.search : undefined;

export function trackPageView(path = window.location.pathname + window.location.search) {
  if (lastTrackedPath === path) return;
  lastTrackedPath = path;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
  });
}
