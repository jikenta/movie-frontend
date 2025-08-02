import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recommendations() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/recommendations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMovies(res.data);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
      }
    };

    fetchRecs();
  }, []);

  return (
    <div>
      <h2>Recommended Movies For You</h2>
      {movies.length === 0 ? (
        <p>No recommendations yet. Add some favorites first.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {movies.map((movie) => (
            <div key={movie.id} style={{ margin: '10px' }}>
              <h4>{movie.title}</h4>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;
