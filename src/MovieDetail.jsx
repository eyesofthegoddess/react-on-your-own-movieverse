import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MY_API_KEY = "7d6c7720";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const currentId = id || localStorage.getItem("id");
      
      if (!currentId) {
        setErrorMessage("No movie selection found. Please return to the search page.");
        setIsLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams();
        params.append("apikey", MY_API_KEY);
        params.append("i", currentId.trim());
        params.append("plot", "full");

        const URL = "https://omdbapi.com?" + params.toString();
        const response = await fetch(URL);
        const data = await response.json();

        if (data && data.Response === "True") {
          const basePrice = data.imdbRating && data.imdbRating !== 'N/A' 
            ? (parseFloat(data.imdbRating) * 1.25).toFixed(2) 
            : "5.99";

          setMovie({
            ...data,
            Price: `$${basePrice}`
          });
        } else {
          setErrorMessage(data.Error || "Movie profile not found in database registry.");
        }
      } catch (error) {
        console.error("OMDb Detail Fetch Error:", error);
        setErrorMessage("Network interface link anomaly. Check browser console logs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-wrapper" style={{ padding: '100px 0', textAlign: 'center', width: '100%' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '20px', color: '#ffffff' }}>Fetching full records...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="main special" style={{ margin: '40px auto', maxWidth: '600px' }}>
        <p>{errorMessage}</p>
        <button className="reset-btn" style={{ marginTop: '20px' }} onClick={() => navigate('/search')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="main" style={{ marginTop: '20px', animation: 'modalFadeIn 0.4s ease' }}>

      <button 
        className="reset-btn" 
        onClick={() => navigate('/search')}
        style={{ marginBottom: '30px' }}
      >
        ← Back to Search
      </button>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', maxWidth: '340px' }}>
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} style={{ width: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
          ) : (
            <div className="no-poster-fallback" style={{ height: '480px', borderRadius: '12px' }}><span>{movie.Title}</span></div>
          )}
        </div>

        <div style={{ flex: '2 1 450px', color: '#ffffff', textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '8px', color: '#ffffff' }}>{movie.Title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px', fontSize: '1.05rem' }}>
            {movie.Year} &bull; {movie.Rated} &bull; {movie.Runtime} &bull; {movie.Genre}
          </p>

          <h2 style={{ fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '12px', color: '#ffffff' }}>Synopsis</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', marginBottom: '30px', fontSize: '1.05rem' }}>{movie.Plot}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px 24px', background: 'rgba(0,0,0,0.15)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <strong>Rental Price:</strong> <span style={{ color: '#e37682', fontWeight: '900', fontSize: '1.2rem' }}>{movie.Price}</span>
            <strong>IMDb Rating:</strong> <span style={{ color: '#ffb400', fontWeight: '700' }}>⭐ {movie.imdbRating} / 10</span>
            <strong>Starring Cast:</strong> <span>{movie.Actors}</span>
            <strong>Director:</strong> <span>{movie.Director}</span>
            <strong>Writers:</strong> <span>{movie.Writer}</span>
            <strong>Box Office:</strong> <span>{movie.BoxOffice && movie.BoxOffice !== 'N/A' ? movie.BoxOffice : 'N/A'}</span>
            <strong>Awards won:</strong> <span>{movie.Awards}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
