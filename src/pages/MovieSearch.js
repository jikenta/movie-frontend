import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  // Search handler
  const handleSearch = async (e) => {
    if (e) e.preventDefault(); // Only prevent default on form submit
    if (!query) return;

    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          query,
          page,
        },
      });
      setResults(res.data.results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // Re-run search when page changes
  useEffect(() => {
    if (query) handleSearch();
    // eslint-disable-next-line
  }, [page]);

  // Save movie to favorites or watchlist
  const handleSave = async (movie, type) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in.');

    try {
      const url = `/api/movies/${type}`;
      await axios.post(
        url,
        {
          id: movie.id.toString(),
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`${movie.title} added to ${type}`);
    } catch (err) {
      console.error(`Add to ${type} failed:`, err.response?.data || err.message);
      alert(`Failed to add to ${type}`);
    }
  };

  // Rate a movie
  const handleRateMovie = async (movie, rating) => {
    try {
      await axios.post(
        'http://localhost:5000/api/user/rate',
        {
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          rating: parseInt(rating),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert(`Rated ${movie.title} as ${rating}`);
    } catch (err) {
      console.error(err);
      alert('Error rating movie');
    }
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Pagination */}
      {results.length > 0 && (
        <div style={{ margin: '10px 0' }}>
          {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
          <button onClick={() => setPage(page + 1)} style={{ marginLeft: '10px' }}>Next</button>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {results.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '10px',
              width: '200px',
            }}
          >
            <h3>{movie.title}</h3>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <p>Release Date: {movie.release_date}</p>

            <button onClick={() => handleSave(movie, 'favorites')}>Add to Favorites</button>{' '}
            <button onClick={() => handleSave(movie, 'watchlist')}>Add to Watchlist</button>

            <div style={{ marginTop: '10px' }}>
              <label>Rate:</label>{' '}
              <select onChange={(e) => handleRateMovie(movie, e.target.value)} defaultValue="">
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
