import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from '../assets/IMBIL LOGO.png';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleSectionNav = (sectionId) => {
  if (location.pathname === '/home') {
    // Already on Home
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  } else {
    // Go to Home first
    navigate('/home', {
      state: {
        scrollTo: sectionId,
      },
    });
  }
};

  return (
    <header className="header">
      <div className="header-content">

        {/* Logo */}
        <div className="logo-img">
          <img src={logoImage} alt="IMBIL logo" className="logo-image" />
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <div className="nav-items-container">
            <button className="nav-item" onClick={() => handleNavigation('/home')}>Home</button>
            <button className="nav-item" onClick={() => handleSectionNav('our-plans')}>Our Plans</button>
            <button className="nav-item" onClick={() => handleSectionNav('contact-us')}>Contact Us</button>
            <button className="nav-item" onClick = {() => handleSectionNav('faq')}>FAQ</button>
            <button className="big-button2" onClick={() => handleNavigation('/started')}>
              <span className="button-text2">Get Started</span>
            </button>
          </div>
        </nav>

        {/* Hamburger / X toggle — mobile only */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <span className="close-icon">✕</span>  // ← X when open
          ) : (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          )}
        </button>

      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-nav-item" onClick={() => handleNavigation('/home')}>
            Home
          </button>
          <button className="mobile-nav-item">Our Plans</button>
          <button className="mobile-nav-item">Contact Us</button>
          <button className="mobile-nav-item">FAQ</button>   {/* ← removed duplicate */}
          <button className="mobile-get-started" onClick={() => handleNavigation('/started')}>
            Get Started
          </button>
        </div>
      )}

    </header>
  );
};

export default Header;