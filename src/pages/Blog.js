import React, { useEffect, useState } from 'react';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fakePosts = [
      {
        _id: '1',
        title: 'Top 10 Movies to Watch This Month',
        image: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
        snippet: 'Check out our hand-picked list of must-watch movies this month...',
      },
      {
        _id: '2',
        title: 'Behind the Scenes: Making of Dune',
        image: 'https://image.tmdb.org/t/p/w500/3slB8htT3oQkc3jIbjBAm6Q5nWw.jpg',
        snippet: 'An exclusive look into the making of the sci-fi epic...',
      },
      {
        _id: '3',
        title: 'Why Indie Films Are Thriving',
        image: 'https://image.tmdb.org/t/p/w500/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
        snippet: 'From streaming platforms to film festivals, indie movies are booming...',
      }
    ];

    setPosts(fakePosts);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Movie Blog</h1>
      <div style={styles.grid}>
        {posts.length > 0 ? posts.map(post => (
          <div key={post._id} style={styles.card}>
            <img src={post.image} alt={post.title} style={styles.image} />
            <h2 style={styles.title}>{post.title}</h2>
            <p style={styles.snippet}>{post.snippet}</p>
            <a href={`/blog/${post._id}`} style={styles.link}>Read More →</a>
          </div>
        )) : <p>Loading blog posts...</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#111',
    color: '#eee',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '30px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    ba
