import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <nav>
      <div className="logo">
        <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} id="adarsh-logo">
          <button data-text="Awesome" className="button">
            <span className="actual-text">&nbsp;Sir.Adarsh&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Sir.Adarsh&nbsp;</span>
          </button>
        </a>
      </div>
      <div className="openMenu" onClick={showMenu}>
        <i className="fa fa-bars"></i>
      </div>
      <ul 
        className="mainMenu" 
        style={{ 
          top: menuOpen ? '0' : '-110%', 
          display: 'flex' 
        }}
      >
        <li>
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
            <button className="nav-button">HOME</button>
          </a>
        </li>
        <li>
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>
            <button className="nav-button">PROJECTS</button>
          </a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
            <button className="nav-button">CONTACT</button>
          </a>
        </li>
        <li>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>
            <button className="nav-button">ABOUT</button>
          </a>
        </li>
        <div className="closeMenu" onClick={closeMenu}>
          <i className="fa fa-times"></i>
        </div>
        <span className="icons">
          <a 
            style={{ textDecoration: 'none', color: 'white' }} 
            target="_blank" 
            rel="noopener noreferrer"
            href="https://discord.gg/RG2uWDTV"
          >
            <i className="fab fa-"></i>
          </a>
          <a 
            style={{ textDecoration: 'none', color: 'white' }} 
            target="_blank" 
            rel="noopener noreferrer"
            href="https://www.instagram.com/gearhax_yt/"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            style={{ textDecoration: 'none', color: 'white' }} 
            target="_blank" 
            rel="noopener noreferrer"
            href="https://codepen.io/gearhax_yt"
          >
            <i className="fa-brands fa-codepen"></i>
          </a>
          <a 
            style={{ textDecoration: 'none', color: 'white' }} 
            target="_blank" 
            rel="noopener noreferrer"
            href="https://github.com/GEARdHAX"
          >
            <i className="fab fa-github"></i>
          </a>
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
