import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/blog" style={styles.link}>Blog</Link>
        <Link to="/recommendations" style={styles.link}>Recommendations</Link>
      </div>
      <div style={styles.right}>
        {!token ? (
          <>
            <Link to="/movies" style={styles.link}>Search Movies</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '15px',
    transition: 'color 0.2s',
  },
  left: {
    display: 'flex',
    gap: '15px',
  },
  right: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Navbar;
