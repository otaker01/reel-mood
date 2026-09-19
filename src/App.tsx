import { useState } from "react";
import type { Page, Filters } from "./types";
import { defaultFilters } from "./types";
import { getRecommendations } from "./data/movies";

import Nav from "./components/Nav";
import MobileNav from "./components/MobileNav";
import SearchOverlay from "./components/SearchOverlay";
import LoadingScreen from "./components/LoadingScreen";

import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import Discover from "./pages/Discover";
import Browse from "./pages/Browse";
import MovieDetail from "./pages/MovieDetail";
import Categories from "./pages/Categories";
import Saved from "./pages/Saved";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [savedMovies, setSavedMovies] = useState<Set<number>>(new Set());
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiscover = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPage("recommendations");
      window.scrollTo({ top: 0 });
    }, 2600);
  };

  const goToMovie = (id: number) => {
    setSelectedMovieId(id);
    setPage("movie-detail");
    window.scrollTo({ top: 0 });
  };

  const toggleSave = (id: number) => {
    setSavedMovies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCategorySelect = (mood: string) => {
    setFilters({ ...defaultFilters, moods: [mood] });
    setPage("home");
    window.scrollTo({ top: 0 });
  };

  const recommendations = getRecommendations(filters);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0B", color: "#ffffff", fontFamily: "'Outfit', sans-serif" }}>
      {isLoading && <LoadingScreen />}

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

      <main className="min-h-screen">
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
            onBack={() => {
              setPage(page === "movie-detail" ? "recommendations" : page);
              window.scrollTo({ top: 0 });
            }}
          />
        )}

        {page === "categories" && (
          <Categories onCategorySelect={handleCategorySelect} />
        )}

        {page === "saved" && (
          <Saved
            savedMovies={savedMovies}
            onMovieClick={goToMovie}
            onToggleSave={toggleSave}
          />
        )}

      </main>

      <MobileNav
        page={page}
        setPage={navigate}
        onSearch={() => setShowSearch(true)}
        savedCount={savedMovies.size}
      />
    </div>
  );
}
