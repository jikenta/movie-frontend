import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';

function Home() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
          params: {
            api_key: process.env.REACT_APP_TMDB_KEY
          }
        });
        setTrending(res.data.results.slice(0, 6)); // limit to 6
      } catch (err) {
        console.error('Failed to fetch trending:', err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div style={styles.page}>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <h1 style={styles.heroText}>Welcome to Movie Verse</h1>
        <p style={styles.subText}>Explore the world of movies and discover your next favorite!</p>
      </div>

      {/* Trending Section */}
      <section>
        <h2 style={styles.sectionTitle}>🔥 Trending This Week</h2>
        <div style={styles.moviesGrid}>
          {trending.map(movie => (
            <div key={movie.id} style={styles.movieCard}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={styles.poster}
              />
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Ads Section */}
      <section style={styles.ads}>
        <h3>Ad Space</h3>
        <p>Your ad here — promote your product or service!</p>
      </section>

      {/* Blog Section */}
      <section>
        <h2 style={styles.sectionTitle}>🎬 From the Blog</h2>
        <div style={styles.blogGrid}>
          <div style={styles.blogCard}>
            <h4>Top 10 Sci-Fi Movies to Watch in 2025</h4>
            <p>From AI dystopias to time travel, these movies will blow your mind...</p>
          </div>
          <div style={styles.blogCard}>
            <h4>How to Create a Perfect Movie Night</h4>
            <p>Popcorn, friends, and the best streaming picks!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const styles = {
  page: {
    padding: '20px',
    fontFamily: 'sans-serif'
  },
  hero: {
    backgroundImage: 'url(https://image.tmdb.org/t/p/original/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px'
  },
  heroText: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0
  },
  subText: {
    fontSize: '1.2rem'
  },
  sectionTitle: {
    marginTop: '30px',
    marginBottom: '10px'
  },
  moviesGrid: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  movieCard: {
    width: '150px',
    textAlign: 'center'
  },
  poster: {
    width: '100%',
    borderRadius: '8px'
  },
  ads: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    margin: '30px 0',
    borderRadius: '8px',
    textAlign: 'center'
  },
  blogGrid: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  blogCard: {
    backgroundColor: '#eee',
    padding: '15px',
    borderRadius: '8px',
    flex: 1,
    minWidth: '250px'
  }
};

export default Home;
