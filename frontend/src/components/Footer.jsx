import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="footer-brand">
              <span>🎓 CareerGuide</span>
            </div>
            <p style={{ marginTop: '8px', maxWidth: '380px', fontSize: '0.9rem', color: '#94a3b8' }}>
              Student Skill and Career Recommendation System. Empowering students to make confident, data-driven career choices.
            </p>
          </div>

          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/profile" className="footer-link">Get Started</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CareerGuide. All rights reserved. Designed for Java & MySQL Backend Integration.</p>
        </div>
      </div>
    </footer>
  );
}
