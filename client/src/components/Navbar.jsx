import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        <Link to="/" className="logo">
          <span className="logo-dot"></span>
          BuildNext AI
        </Link>

        <div className="nav-links">

          <Link
            className={
              location.pathname === '/'
                ? 'active-link'
                : ''
            }
            to="/"
          >
            Home
          </Link>

          <Link
            className={
              location.pathname === '/about'
                ? 'active-link'
                : ''
            }
            to="/about"
          >
            About
          </Link>

          <Link
            className={
              location.pathname === '/contact'
                ? 'active-link'
                : ''
            }
            to="/contact"
          >
            Contact
          </Link>

        </div>

        <a
          href="https://github.com/Navneet-pratap1027"
          target="_blank"
          rel="noreferrer"
          className="github-btn"
        >
          GitHub
        </a>

      </div>
    </nav>
  );
}