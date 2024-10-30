import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://veziv.ro/wp-content/uploads/2024/02/Logo-Veziv-2024-white-v3-1.png"
            alt="Logo Veziv"
            style={{ height: '40px' }} 
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-md-auto gap-2">
            <li className="nav-item rounded">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                aria-current="page"
                to="/"
                onClick={handleLinkClick} 
              >
                <i className="bi bi-house-fill me-2"></i>Acasa
              </Link>
            </li>
            <li className="nav-item rounded">
              <Link
                className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`} 
                to="/portfolio"
                onClick={handleLinkClick}
              >
                <i className="bi bi-people-fill me-2"></i>Portofoliu
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
