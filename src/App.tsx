import { useState, useEffect, useRef } from "react";
import type { Page, Filters, Movie } from "./types";
import { defaultFilters } from "./types";
import { fetchRecommendations, fetchMovieDetail, getCachedMovie, cacheMovies } from "./lib/tmdb";
import { hrefFor, parseLocation } from "./lib/routing";
import { loadSavedMovies, persistSavedMovies } from "./lib/storage";

import Nav from "./components/Nav";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import SearchOverlay from "./components/SearchOverlay";
import LoadingScreen from "./components/LoadingScreen";

import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import Discover from "./pages/Discover";
import Browse from "./pages/Browse";
import MovieDetail from "./pages/MovieDetail";
import Saved from "./pages/Saved";
import Policies from "./pages/Policies";

const initialRoute = parseLocation();
const initialSaved = loadSavedMovies();
cacheMovies(initialSaved);

export default function App() {
  const [page, setPage] = useState<Page>(initialRoute.page);
  const [filters, setFilters] = useState<Filters>(
    initialRoute.page === "recommendations" ? initialRoute.filters : defaultFilters,
  );
  const [savedMovies, setSavedMovies] = useState<Set<number>>(() => new Set(initialSaved.map((m) => m.id)));
  const [savedMovieData, setSavedMovieData] = useState<Movie[]>(initialSaved);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(initialRoute.movieId);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<(Movie & { match: number })[]>([]);
  const [recsLoading, setRecsLoading] = useState(() => initialRoute.page === "recommendations");
  const [loadError, setLoadError] = useState<string | null>(null);
  const skipNextRecFetch = useRef(false);
  const savedMoviesRef = useRef(savedMovies);
  savedMoviesRef.current = savedMovies;

  useEffect(() => {
    window.history.replaceState(
      { page: initialRoute.page, movieId: initialRoute.movieId },
      "",
      window.location.pathname + window.location.search,
    );
  }, []);

  useEffect(() => {
    persistSavedMovies(savedMovieData);
    cacheMovies(savedMovieData);
  }, [savedMovieData]);

  useEffect(() => {
    const onPopState = () => {
      const route = parseLocation();
      setPage(route.page);
      setSelectedMovieId(route.movieId);
      if (route.page === "recommendations") {
        setFilters(route.filters);
      }
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const pushRoute = (nextPage: Page, movieId: number | null = null, nextFilters?: Filters) => {
    const url = hrefFor(nextPage, movieId, nextPage === "recommendations" ? (nextFilters ?? filters) : undefined);
    window.history.pushState({ page: nextPage, movieId, internal: true }, "", url);
  };

  const replaceRoute = (nextPage: Page, movieId: number | null = null, nextFilters?: Filters) => {
    const url = hrefFor(nextPage, movieId, nextPage === "recommendations" ? (nextFilters ?? filters) : undefined);
    window.history.replaceState({ page: nextPage, movieId }, "", url);
  };

  const navigate = (p: Page) => {
    setPage(p);
    if (p !== "movie-detail") setSelectedMovieId(null);
    pushRoute(p);
    window.scrollTo({ top: 0 });
  };

  const handleDiscover = async () => {
    setIsLoading(true);
    setLoadError(null);
    const minDelay = new Promise((r) => setTimeout(r, 1200));
    try {
      const [movies] = await Promise.all([fetchRecommendations(filters), minDelay]);
      skipNextRecFetch.current = true;
      setRecommendations(movies);
      setRecsLoading(false);
      setPage("recommendations");
      setSelectedMovieId(null);
      pushRoute("recommendations", null, filters);
      window.scrollTo({ top: 0 });
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page !== "recommendations") return;
    replaceRoute("recommendations", null, filters);
    if (skipNextRecFetch.current) {
      skipNextRecFetch.current = false;
      setRecsLoading(false);
      return;
    }
    let cancelled = false;
    setRecsLoading(true);
    (async () => {
      try {
        const movies = await fetchRecommendations(filters);
        if (!cancelled) setRecommendations(movies);
      } catch {
        /* keep existing results */
      } finally {
        if (!cancelled) setRecsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [filters, page]);

  const goToMovie = (id: number) => {
    setSelectedMovieId(id);
    setPage("movie-detail");
    pushRoute("movie-detail", id);
    window.scrollTo({ top: 0 });
  };

  const addSavedMovie = (movie: Movie) => {
    cacheMovies([movie]);
    setSavedMovies((prev) => {
      const next = new Set(prev);
      next.add(movie.id);
      return next;
    });
    setSavedMovieData((list) => {
      if (list.some((m) => m.id === movie.id)) return list;
      return [...list, movie];
    });
  };

  const toggleSave = (id: number) => {
    if (savedMovies.has(id)) {
      setSavedMovies((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setSavedMovieData((list) => list.filter((m) => m.id !== id));
      return;
    }

    const cached = getCachedMovie(id);
    if (cached) {
      addSavedMovie(cached);
      return;
    }

    setSavedMovies((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    fetchMovieDetail(id)
      .then((movie) => {
        if (!savedMoviesRef.current.has(id)) return;
        addSavedMovie(movie);
      })
      .catch(() => {
        setSavedMovies((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      });
  };

  const handleBack = () => {
    if (window.history.state?.internal) {
      window.history.back();
      return;
    }
    setPage("home");
    setSelectedMovieId(null);
    replaceRoute("home");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen min-w-0 max-w-full flex flex-col" style={{ backgroundColor: "#0A0A0B", color: "#ffffff", fontFamily: "'Outfit', sans-serif" }}>
      {isLoading && <LoadingScreen />}

      {loadError && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[90] max-w-md w-[90%] bg-red-950/90 border border-red-500/40 text-red-100 text-sm rounded-xl px-4 py-3 shadow-xl">
          {loadError}
          <button className="ml-3 underline" onClick={() => setLoadError(null)}>Dismiss</button>
        </div>
      )}

      {showSearch && (
        <SearchOverlay
          onClose={() => setShowSearch(false)}
          onMovieSelect={goToMovie}
        />
      )}

      <Nav
        page={page}
        setPage={navigate}
        onSearch={() => setShowSearch(true)}
        savedCount={savedMovies.size}
      />

      <main className="flex-1 min-w-0 max-w-full">
        {page === "home" && (
          <Home
            filters={filters}
            setFilters={setFilters}
            onDiscover={handleDiscover}
          />
        )}

        {page === "recommendations" && (
          <Recommendations
            filters={filters}
            setFilters={setFilters}
            movies={recommendations}
            savedMovies={savedMovies}
            onToggleSave={toggleSave}
            onMovieClick={goToMovie}
            onAdjustFilters={() => navigate("home")}
            loading={recsLoading}
          />
        )}

        {page === "discover" && (
          <Discover
            savedMovies={savedMovies}
            onToggleSave={toggleSave}
            onMovieClick={goToMovie}
          />
        )}

        {page === "browse" && (
          <Browse
            savedMovies={savedMovies}
            onToggleSave={toggleSave}
            onMovieClick={goToMovie}
          />
        )}

        {page === "movie-detail" && selectedMovieId !== null && (
          <MovieDetail
            movieId={selectedMovieId}
            savedMovies={savedMovies}
            onToggleSave={toggleSave}
            onMovieClick={goToMovie}
            onBack={handleBack}
          />
        )}

        {page === "saved" && (
          <Saved
            movies={savedMovieData}
            onMovieClick={goToMovie}
            onToggleSave={toggleSave}
          />
        )}

        {page === "policies" && <Policies />}

      </main>

      <Footer setPage={navigate} />

      <MobileNav
        page={page}
        setPage={navigate}
        onSearch={() => setShowSearch(true)}
        savedCount={savedMovies.size}
      />
    </div>
  );
}
