import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MY_API_KEY = "7d6c7720";

function MovieCard({ movie, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const isMissingPoster = !movie.Poster || movie.Poster === 'N/A';

  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      {isMissingPoster || imgError ? (
        <div className="no-poster-fallback"><span>{movie.Title}</span></div>
      ) : (
        <img src={movie.Poster} alt={movie.Title} onError={() => setImgError(true)} />
      )}
      <div className="movie-card__container">
        <h3>{movie.Title}</h3>
        <p><strong>Type:</strong> {movie.Type}</p>
        <p><strong>Year:</strong> {movie.Year}</p>
      </div>
    </div>
  );
}

function SearchPage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterSort, setFilterSort] = useState('');

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const executeSearch = async (term = searchInput, type = filterType, year = filterYear, sort = filterSort) => {
    if (!term || term.trim() === "") {
      setMovies([]);
      setErrorMessage("Please enter a movie title in the search box to begin filtering.");
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const params = new URLSearchParams();
      params.append("apikey", MY_API_KEY);
      params.append("s", term.trim());

      if (type && type.trim() !== "") params.append("type", type.trim());
      if (year && year.trim().length === 4) params.append("y", year.trim());

      const URL = "https://omdbapi.com?" + params.toString();
      const response = await fetch(URL);
      const movieData = await response.json();

      if (movieData.Response === "True") {
        let fetchedMovies = movieData.Search;

        if (sort === "alpha-az") {
          fetchedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
        } else if (sort === "alpha-za") {
          fetchedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
        } else if (sort === "date-new") {
          fetchedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        } else if (sort === "date-old") {
          fetchedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        }

        setMovies(fetchedMovies);
      } else {
        setMovies([]);
        setErrorMessage(`No matches found for "${term}" with your selected filters.`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMovies([]);
      setErrorMessage("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    executeSearch("Batman");
  }, []);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    executeSearch(searchInput, value, filterYear, filterSort);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setFilterSort(value);
    executeSearch(searchInput, filterType, filterYear, value);
  };

  const handleYearInput = (e) => {
    const value = e.target.value;
    setFilterYear(value);
    const trimmed = value.trim();
    if (trimmed === "" || trimmed.length === 4) {
      executeSearch(searchInput, filterType, trimmed, filterSort);
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setFilterType('');
    setFilterYear('');
    setFilterSort('');
    setMovies([]);
    setErrorMessage("Please enter a movie title in the search box to begin filtering.");
  };

  const showMovie = (id) => {
    localStorage.setItem("id", id);
    navigate(`/movie/${id}`);
  };

  return (
    <section id="second" className="main special" style={{ animation: 'modalFadeIn 0.3s ease-out' }}>
      <header className="major">
        <h2>Lets Search</h2>
        <p>Find what you need for your watching time.<br />Search away! No need to wait.</p>
      </header>

      <div className="search--container">
        <input 
          type="text" 
          placeholder="Enter movie title..." 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && executeSearch()}
        />
        <select value={filterType} onChange={handleTypeChange}>
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
        <input 
          type="number" 
          placeholder="Year" 
          value={filterYear}
          onChange={handleYearInput}
        />
        <select value={filterSort} onChange={handleSortChange}>
          <option value="">Sort By (Default)</option>
          <option value="alpha-az">Alphabetical A to Z</option>
          <option value="alpha-za">Alphabetical Z to A</option>
          <option value="date-new">Newest to Oldest</option>
          <option value="date-old">Oldest to Newest</option>
        </select>
        <button className="primary" onClick={() => executeSearch()}>Search</button>
        <button className="reset-btn" onClick={clearFilters}>Reset</button>
      </div>

      <div className="movie-container">
        {isLoading && <div className="loading-wrapper"><div className="spinner"></div></div>}
        {!isLoading && errorMessage && <div style={{ textAlign: "center", padding: "20px", color: "#ffffff" }}><p>{errorMessage}</p></div>}
        {!isLoading && !errorMessage && movies.length > 0 && (
          <div className="movie-carousel-viewport">
            <div className="movie-carousel-track">
              {movies.slice(0, 6).map((movie) => <MovieCard key={`s1-${movie.imdbID}`} movie={movie} onSelect={showMovie} />)}
              {movies.slice(0, 6).map((movie) => <MovieCard key={`s2-${movie.imdbID}`} movie={movie} onSelect={showMovie} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchPage;
