import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [profile, setProfile] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
        setFavorites(res.data.favorites);
        setWatchlist(res.data.watchlist);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleDelete = async (movieId, type) => {
    try {
      await axios.delete(`/api/movies/${type}/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (type === 'favorites') {
        setFavorites(favorites.filter(movie => movie.movieId !== movieId));
      } else {
        setWatchlist(watchlist.filter(movie => movie.movieId !== movieId));
      }
    } catch (err) {
      console.error('Failed to delete movie', err);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {profile.email}</p>

      <h3>Favorites</h3>
      {favorites.map(movie => (
        <div key={movie.movieId}>
          <p>{movie.title}</p>
          <button onClick={() => handleDelete(movie.movieId, 'favorites')}>Remove</button>
        </div>
      ))}

      <h3>Watchlist</h3>
      {watchlist.map(movie => (
        <div key={movie.movieId}>
          <p>{movie.title}</p>
          <button onClick={() => handleDelete(movie.movieId, 'watchlist')}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default UserProfile;
