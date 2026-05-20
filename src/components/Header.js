import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/IMBIL LOGO.png';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        setMenuOpen(false); // close menu when navigating
        navigate(path);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-img">
                    <img src={logoImage} alt="IMBIL logo" className="logo-image" />
                </div>

                {/* Hamburger — only visible on mobile */}
                <button
                    className="hamburger-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Nav — always visible on desktop, toggles on mobile */}
                <nav className={`navigation ${menuOpen ? 'open' : ''}`}>
                    <div className="nav-items-container">
                        <button className="nav-item"
                            onClick={() => handleNavigation('/home')}>
                            Home
                        </button>
                        <button className="nav-item">Our Plans</button>
                        <button className="nav-item">Contact Us</button>
                        <button className="nav-item">FAQ</button>
                        <button className="big-button2"
                            onClick={() => handleNavigation('/started')}>
                            <span className="button-text2">Get Started</span>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;