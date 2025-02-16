import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div
                    className="navbar-logo"
                    onClick={() => handleNavigation('/')}
                    style={{ cursor: 'pointer' }}
                >
                    KanBonsai
                </div>
                <button className="navbar-toggle" onClick={toggleMenu}>
                    <span className="hamburger-icon">&#9776;</span>
                </button>
                <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    <button className="navbar-button projects-btn" onClick={() => handleNavigation('/projects')}>
                        Projects
                    </button>
                    <button className="navbar-button issues-btn" onClick={() => handleNavigation('/issues')}>
                        Issues
                    </button>
                    <button className="navbar-button teams-btn" onClick={() => handleNavigation('/teams')}>
                        Teams
                    </button>
                    {/* <button className="navbar-button notes-btn" onClick={() => handleNavigation('/notes')}>
                        Notes
                    </button> */}
                    <button className="navbar-button docs-btn" onClick={() => handleNavigation('/docs')}>
                        API Docs
                    </button>
                    <button onClick={handleLogout} className="logout-btn">
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
