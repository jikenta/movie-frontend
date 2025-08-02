
import React, { useState } from 'react';
import { searchMovies } from '../utils/tmdb';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const movies = await searchMovies(query);
    setResults(movies);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
