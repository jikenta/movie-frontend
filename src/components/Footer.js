import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
      <div style={styles.links}>
        <a href="/about" style={styles.link}>About</a>
        <a href="/contact" style={styles.link}>Contact</a>
        <a href="/terms" style={styles.link}>Terms</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: '50px',
    padding: '20px',
    backgroundColor: '#111',
    color: '#fff',
    textAlign: 'center',
    borderTop: '1px solid #333',
  },
  links: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default Footer;
