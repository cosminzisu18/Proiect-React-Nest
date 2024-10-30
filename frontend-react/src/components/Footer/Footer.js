import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'; 
import { faPhone, faHeart } from '@fortawesome/free-solid-svg-icons'; 
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="contact-text">Contactează-mă</p>
        <div className="icon-container">
          <a 
            href="https://www.linkedin.com/in/cosmin-zisu-64360b214/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-circle"
          >
            <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
          </a>
          <a 
            href="https://github.com/cosminzisu18/Proiect-React-Nest" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-circle"
          >
            <FontAwesomeIcon icon={faHeart} className="footer-icon" />
          </a>
          <a 
            href="tel:0787448331" 
            className="icon-circle"
          >
            <FontAwesomeIcon icon={faPhone} className="footer-icon" />
          </a>
        </div>
      </div>
      <p>&copy; {new Date().getFullYear()} Cosmin Zisu. All rights reserved.</p>
    </footer>
  );
};

export default Footer; 
