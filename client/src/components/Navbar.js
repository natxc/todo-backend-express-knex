import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/issues">Issues</Link>
            <Link to="/teams">Teams</Link>
        </nav>
    );
};

export default Navbar;